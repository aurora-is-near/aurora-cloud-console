import { BridgedToken, Silo } from "@/types/types"
import { isTokenContractDeployed } from "@/utils/is-token-contract-deployed"

export const isBridgedTokenDeployed = async (
  silo: Silo,
  token: BridgedToken,
) => {
  const isBaseToken =
    silo.base_token_symbol.toUpperCase() === token.symbol.toUpperCase()

  if (isBaseToken) {
    return true
  }

  if (!token.aurora_address) {
    return false
  }

  return isTokenContractDeployed(silo, token.aurora_address)
}
