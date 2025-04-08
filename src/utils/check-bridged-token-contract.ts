import { JsonRpcProvider } from "ethers"
import { checkTokenByContractAddress } from "@/utils/check-token-contract"
import { BridgedToken, Silo } from "@/types/types"

export const checkContract = async ({
  provider,
  silo,
  bridgedToken,
}: {
  provider: JsonRpcProvider
  silo: Silo
  bridgedToken: BridgedToken
}): Promise<boolean> => {
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
