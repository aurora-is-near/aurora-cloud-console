import { JsonRpcProvider } from "ethers"
import { createSiloBridgedToken } from "@/actions/silo-bridged-tokens/create-silo-bridged-token"
import { DEFAULT_TOKENS } from "@/constants/default-tokens"
import { BridgedToken, Silo } from "@/types/types"
import { checkTokenByContractAddress } from "@/utils/check-token-contract"
import { filterBridgedTokensBySymbol } from "@/actions/bridged-tokens/filter-bridged-tokens-by-symbol"
import { filterSiloBridgedTokensBySymbol } from "@/actions/silo-bridged-tokens/filter-silo-bridged-tokens-by-symbol"

const checkContract = async (
  provider: JsonRpcProvider,
  silo: Silo,
  bridgedToken: BridgedToken,
): Promise<boolean> => {
  const siloAddress = bridgedToken.silo_address

  // Base tokens do not need a contract to be deployed.
  if (
    silo.base_token_symbol.toUpperCase() === bridgedToken.symbol.toUpperCase()
  ) {
    return true
  }

  // If there is no address we can't check if the contract was deployed.
  if (!siloAddress) {
    return false
  }

  return checkTokenByContractAddress(provider, siloAddress)
}

export const initialiseSiloBridgedTokens = async (
  silo: Silo,
): Promise<void> => {
  const symbols = [...DEFAULT_TOKENS, silo.base_token_symbol]

  const [siloBridgedTokens, bridgedTokens] = await Promise.all([
    filterSiloBridgedTokensBySymbol(silo.id, symbols),
    filterBridgedTokensBySymbol(symbols),
  ])

  const provider = new JsonRpcProvider(silo.rpc_url)

  await Promise.all(
    [...DEFAULT_TOKENS, silo.base_token_symbol].map(async (symbol) => {
      const bridgedToken =
        bridgedTokens.find(
          (token) => token.symbol.toUpperCase() === symbol.toUpperCase(),
        ) ?? null

      if (!bridgedToken) {
        return
      }

      // Check if the token was already marked as bridged for the silo
      if (siloBridgedTokens.some((token) => token.id === bridgedToken.id)) {
        return
      }

      // Mark the token as bridged for the silo, checking if the contract was
      // already deployed.
      await createSiloBridgedToken(silo.id, bridgedToken.id, {
        isDeploymentPending: await checkContract(provider, silo, bridgedToken),
      })
    }),
  )
}
