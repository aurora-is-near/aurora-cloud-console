import { deployDefaultTokens } from "@/actions/deployment/deploy-default-tokens"
import {
  BaseTokenSymbol,
  Silo,
  SiloConfigTransactionStatus,
} from "@/types/types"
import { updateSilo } from "@/actions/silos/update-silo"
import { setBaseToken } from "@/actions/deployment/set-base-token"
import { getSiloBridgedTokenRequests } from "@/actions/silo-bridged-tokens/get-silo-bridged-token-requests"
import { getSiloBridgedTokens } from "@/actions/silo-bridged-tokens/get-silo-bridged-tokens"
import { resolveBridgedTokenRequest } from "@/actions/silo-bridged-tokens/resolve-bridged-token-request"
import { getBridgedTokens } from "@/actions/bridged-tokens/get-bridged-tokens"
import { createSiloBridgedToken } from "@/actions/silo-bridged-tokens/create-silo-bridged-token"
import { isBridgedTokenDeployed } from "@/utils/is-bridged-token-deployed"
import { updateSiloBridgedToken } from "@/actions/silo-bridged-tokens/update-silo-bridged-token"
import { AUTOMATED_BASE_TOKENS } from "@/constants/base-token"
import { checkPendingTransaction } from "@/utils/check-pending-silo-config-transaction"
import { getPendingSiloConfigTransactions } from "@/actions/silo-config-transactions/get-pending-silo-config-transactions"

type PreviouslyInspectedSilo = Omit<Silo, "inspected_at"> & {
  inspected_at: string
}

type RepairSiloResult = {
  status: "ok" | "skipped"
  initialisation: {
    defaultTokensDeployed: SiloConfigTransactionStatus
    baseTokenSet: SiloConfigTransactionStatus
    isSiloActive: boolean
  } | null
  pendingTransactions: {
    numberOfPendingTransactions: number
    numberOfPendingTransactionsResolved: number
  } | null
  pendingBridgedTokens: {
    numberOfRequests: number
    numberOfRequestsResolved: number
    numberOfPendingDeployments: number
    numberOfPendingDeploymentsResolved: number
  } | null
}

const isPreviouslyInspectedSilo = (
  silo: Silo | PreviouslyInspectedSilo,
): silo is PreviouslyInspectedSilo => !!silo.inspected_at

/**
 * Check if any pending bridged tokens can be resolved.
 */
const resolvePendingBridgedTokens = async (
  silo: Silo,
): Promise<RepairSiloResult["pendingBridgedTokens"]> => {
  const [requests, siloBridgedTokens, bridgedTokens] = await Promise.all([
    getSiloBridgedTokenRequests(silo.id),
    getSiloBridgedTokens(silo.id),
    getBridgedTokens(),
  ])

  let numberOfRequestsResolved = 0

  // Check if any requests for custom tokens can be resolved. If we have
  // subsequently configured a token with the same symbol as a request we can
  // resolve that request and assign the bridged token to the silo.
  await Promise.all(
    requests.map(async (request) => {
      if (siloBridgedTokens.some((token) => token.symbol === request.symbol)) {
        return
      }

      const bridgedToken = bridgedTokens.find(
        (token) => token.symbol === request.symbol,
      )

      if (!bridgedToken) {
        return
      }

      await createSiloBridgedToken(silo.id, bridgedToken.id, {
        isDeploymentPending: !(await isBridgedTokenDeployed(
          silo,
          bridgedToken,
        )),
      })

      await resolveBridgedTokenRequest(request.id)
      numberOfRequestsResolved += 1
    }),
  )

  const pendingSiloBridgedTokens = siloBridgedTokens.filter(
    (bridgedToken) => bridgedToken.is_deployment_pending,
  )

  let numberOfPendingDeploymentsResolved = 0

  // Check if any bridge tokens previously marked as pending have been deployed,
  // mark them as deployed if so.
  await Promise.all(
    pendingSiloBridgedTokens.map(async (bridgedToken) => {
      if (await isBridgedTokenDeployed(silo, bridgedToken)) {
        await updateSiloBridgedToken(silo.id, bridgedToken.id, {
          isDeploymentPending: false,
        })

        numberOfPendingDeploymentsResolved += 1
      }
    }),
  )

  return {
    numberOfRequests: requests.length,
    numberOfRequestsResolved,
    numberOfPendingDeployments: pendingSiloBridgedTokens.length,
    numberOfPendingDeploymentsResolved,
  }
}

const isAutomatableBaseToken = (baseToken?: string) =>
  AUTOMATED_BASE_TOKENS.includes(baseToken as BaseTokenSymbol)

/**
 * Perform various essential transactions to initialise a silo.
 */
const initialiseSilo = async (
  silo: PreviouslyInspectedSilo,
): Promise<RepairSiloResult["initialisation"]> => {
  const isWithin24Hours =
    Date.now() - new Date(silo.inspected_at).getTime() < 24 * 60 * 60 * 1000

  const transactionResults: SiloConfigTransactionStatus[] = await Promise.all([
    deployDefaultTokens(silo, { skipIfFailed: isWithin24Hours }),
    isAutomatableBaseToken(silo.base_token_symbol)
      ? setBaseToken(silo, { skipIfFailed: isWithin24Hours })
      : "PENDING",
  ])

  const siloUpdateProperties: Partial<Silo> = {
    inspected_at: new Date().toISOString(),
  }

  // If the silo has never been marked as active, mark it as such.
  if (
    !silo.is_active &&
    transactionResults.every((result) => result === "SUCCESSFUL")
  ) {
    siloUpdateProperties.is_active = true
  }

  await updateSilo(silo.id, siloUpdateProperties)

  return {
    defaultTokensDeployed: transactionResults[0],
    baseTokenSet: transactionResults[1],
    isSiloActive: silo.is_active ?? siloUpdateProperties.is_active ?? false,
  }
}

const resolvePendingTransactions = async (
  silo: Silo,
): Promise<RepairSiloResult["pendingTransactions"]> => {
  const pendingTransactions = await getPendingSiloConfigTransactions(silo.id)

  const results = await Promise.all(
    pendingTransactions.map(async (transaction) =>
      checkPendingTransaction(transaction, silo),
    ),
  )

  return {
    numberOfPendingTransactions: pendingTransactions.length,
    numberOfPendingTransactionsResolved: results.filter(
      (result) => result !== "PENDING",
    ).length,
  }
}

/**
 * Perform various checks and, if necessary, transactions to repair a silo.
 *
 * If the silo has never been inspected mark it as such and defer to the next
 * inspection. This is to help ensure we have a chance for the user to go
 * through the onboarding process without this check interrupting and taking
 * over before they have a chance to do so.
 */
export const repairSilo = async (silo: Silo): Promise<RepairSiloResult> => {
  if (!isPreviouslyInspectedSilo(silo)) {
    await updateSilo(silo.id, { inspected_at: new Date().toISOString() })

    return {
      status: "skipped",
      initialisation: null,
      pendingTransactions: null,
      pendingBridgedTokens: null,
    }
  }

  const initialisation = await initialiseSilo(silo)

  const [pendingBridgedTokens, pendingTransactions] = await Promise.all([
    resolvePendingBridgedTokens(silo),
    resolvePendingTransactions(silo),
  ])

  return {
    status: "ok",
    initialisation,
    pendingTransactions,
    pendingBridgedTokens,
  }
}
