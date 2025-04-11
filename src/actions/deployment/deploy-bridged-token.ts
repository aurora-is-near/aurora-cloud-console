"use server"

import { JsonRpcProvider } from "ethers"
import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import { BridgedToken, Silo, SiloConfigTransactionStatus } from "@/types/types"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { checkTokenByContractAddress } from "@/utils/check-token-contract"
import { getStorageBalanceByAddress } from "@/utils/near-storage"
import { BASE_TOKEN_PLACEHOLDER_ADDRESS } from "@/constants/base-token"
import { STORAGE_DEPOSIT_AMOUNT } from "@/constants/storage-deposits"

const checkContract = async ({
  provider,
  silo,
  bridgedToken,
  skipIfFailed,
}: {
  provider: JsonRpcProvider
  silo: Silo
  bridgedToken: BridgedToken
  skipIfFailed?: boolean
}): Promise<SiloConfigTransactionStatus> => {
  const nearAccountId = bridgedToken.near_address
  const siloAddress = bridgedToken.silo_address

  // Base tokens do not need an ERC20 contract deployed.
  if (
    silo.base_token_symbol.toUpperCase() === bridgedToken.symbol.toUpperCase()
  ) {
    return "SUCCESSFUL"
  }

  // If there is no silo address we can't mirror the token, or check if the
  // token contract was deployed. We return pending as the result for the case
  // where we fill this account ID in later.
  if (!siloAddress) {
    return "PENDING"
  }

  const isContractDeployed = await checkTokenByContractAddress(
    provider,
    siloAddress,
  )

  if (isContractDeployed) {
    return "SUCCESSFUL"
  }

  // If there is no near account ID is set we can't mirror the token. We return
  // pending as the result for the case where we fill this account ID in later.
  if (!nearAccountId) {
    return "PENDING"
  }

  return performSiloConfigTransaction(
    silo,
    "DEPLOY_TOKEN",
    async () =>
      contractChangerApiClient.mirrorErc20Token({
        siloEngineAccountId: silo.engine_account,
        token: {
          source_contract_id: "aurora",
          nep141: nearAccountId,
        },
      }),
    { skipIfFailed, nearAccountId },
  )
}

const checkStorageBalance = async ({
  silo,
  bridgedToken,
  skipIfFailed,
}: {
  silo: Silo
  bridgedToken: BridgedToken
  skipIfFailed?: boolean
}): Promise<SiloConfigTransactionStatus> => {
  const nearAccountId = bridgedToken.near_address

  // Covers the case where we are checking the base token (i.e. NEAR).
  if (nearAccountId === BASE_TOKEN_PLACEHOLDER_ADDRESS) {
    return "SUCCESSFUL"
  }

  // If no near account ID is set we can't check the storage balance. We return
  // pending as the result for the case where we fill this account ID in later.
  if (!nearAccountId) {
    return "PENDING"
  }

  const storageBalance = await getStorageBalanceByAddress(
    silo.engine_account,
    nearAccountId,
  )

  if (storageBalance?.total) {
    return "SUCCESSFUL"
  }

  return performSiloConfigTransaction(
    silo,
    "STORAGE_DEPOSIT",
    async () =>
      contractChangerApiClient.makeStorageDeposit({
        siloEngineAccountId: silo.engine_account,
        amount: STORAGE_DEPOSIT_AMOUNT,
        token: nearAccountId,
      }),
    { skipIfFailed, nearAccountId },
  )
}

export const deployBridgedToken = async ({
  silo,
  bridgedToken,
  skipIfFailed,
}: {
  silo: Silo
  bridgedToken: BridgedToken
  skipIfFailed?: boolean
}): Promise<SiloConfigTransactionStatus> => {
  const provider = new JsonRpcProvider(silo.rpc_url)

  const statuses = await Promise.all([
    checkContract({
      provider,
      silo,
      bridgedToken,
      skipIfFailed,
    }),
    checkStorageBalance({ silo, bridgedToken, skipIfFailed }),
  ])

  if (statuses.includes("PENDING")) {
    return "PENDING"
  }

  if (statuses.includes("FAILED")) {
    return "FAILED"
  }

  return "SUCCESSFUL"
}
