import { JsonRpcProvider } from "ethers"
import { checkTokenByContractAddress } from "@/utils/check-token-contract"
import { Silo } from "@/types/types"

export const isTokenContractDeployed = async (
  silo: Silo,
  contractAddress: string,
) => {
  const provider = new JsonRpcProvider(silo.rpc_url)
  const isDeployed = await checkTokenByContractAddress(
    provider,
    contractAddress,
  )

  return isDeployed
}
