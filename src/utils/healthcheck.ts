import { Block, JsonRpcProvider, Network } from "ethers"
import {
  checkTokenByContractAddress,
  checkTokenBySymbol,
} from "@/utils/check-token-contract"
import { Silo, SiloBridgedToken } from "@/types/types"
import { DEFAULT_TOKENS } from "@/constants/default-tokens"
import { DefaultToken } from "@/types/default-tokens"
import { getSiloBridgedTokens } from "@/actions/silo-bridged-tokens/get-silo-bridged-tokens"
import {
  getStorageBalanceByAddress,
  getStorageBalanceBySymbol,
} from "@/utils/near-storage"

const STALLED_THRESHOLD = 60

type TokenContractMetadata = {
  isContractDeployed: boolean
  storageBalance: {
    total: string
    available: string
  } | null
}

/**
 * Check that all of the expected default tokens were deployed.
 */
const checkDefaultTokens = async (provider: JsonRpcProvider, silo: Silo) => {
  const supportedTokens = await Promise.all(
    DEFAULT_TOKENS.map(async (symbol): Promise<TokenContractMetadata> => {
      const isBaseToken = silo.base_token_symbol === symbol

      if (isBaseToken) {
        return {
          isContractDeployed: true,
          storageBalance: await getStorageBalanceBySymbol(
            silo.engine_account,
            symbol,
          ),
        }
      }

      const [isContractDeployed, storageBalance] = await Promise.all([
        checkTokenBySymbol(provider, symbol),
        getStorageBalanceBySymbol(silo.engine_account, symbol),
      ])

      return {
        isContractDeployed,
        storageBalance,
      }
    }),
  )

  const defaultValue: TokenContractMetadata = {
    isContractDeployed: false,
    storageBalance: null,
  }

  return DEFAULT_TOKENS.reduce<Record<DefaultToken, TokenContractMetadata>>(
    (acc, symbol, index) => ({
      ...acc,
      [symbol]: supportedTokens[index],
    }),
    {
      NEAR: defaultValue,
      USDt: defaultValue,
      USDC: defaultValue,
      AURORA: defaultValue,
    },
  )
}

const checkBridgedTokenContract = async (
  silo: Silo,
  token: SiloBridgedToken,
  provider: JsonRpcProvider,
): Promise<boolean> => {
  if (!token.is_deployment_pending) {
    return true
  }

  if (silo.base_token_symbol === token.symbol) {
    return true
  }

  if (!token.aurora_address) {
    return false
  }

  return checkTokenByContractAddress(provider, token.aurora_address)
}

export const checkBridgedTokens = async (
  provider: JsonRpcProvider,
  silo: Silo,
) => {
  const bridgedTokens = await getSiloBridgedTokens(silo.id)
  const result: Record<string, TokenContractMetadata> = {}

  await Promise.all(
    bridgedTokens.map(async (token) => {
      const [isContractDeployed, storageBalance] = await Promise.all([
        checkBridgedTokenContract(silo, token, provider),
        token.near_address
          ? getStorageBalanceByAddress(silo.engine_account, token.near_address)
          : null,
      ])

      result[token.symbol] = {
        isContractDeployed,
        storageBalance,
      }
    }, {}),
  )

  return result
}

/**
 * Check for stalled node (block timestamp too old).
 */
const hasStalledNodes = (latestBlock: Block | null) => {
  const lastBlockTime = latestBlock?.timestamp ?? 0
  const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds

  return currentTime - lastBlockTime > STALLED_THRESHOLD
}

const getStatus = ({
  silo,
  network,
  latestBlock,
}: {
  silo: Silo
  network: Network
  latestBlock: Block | null
}): "ok" | "invalid-network" | "stalled" => {
  const isNetworkValid = Number(network.chainId.toString()) === silo.chain_id

  if (!isNetworkValid) {
    return "invalid-network"
  }

  if (hasStalledNodes(latestBlock)) {
    return "stalled"
  }

  return "ok"
}

export const healthcheck = async (silo: Silo) => {
  const provider = new JsonRpcProvider(silo.rpc_url)

  const [defaultTokens, bridgedTokens, latestBlock, network] =
    await Promise.all([
      checkDefaultTokens(provider, silo),
      checkBridgedTokens(provider, silo),
      provider.getBlock("latest"),
      provider.getNetwork(),
    ])

  return {
    networkStatus: getStatus({ silo, network, latestBlock }),
    defaultTokens,
    bridgedTokens,
  }
}
