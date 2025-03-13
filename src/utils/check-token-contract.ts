import { Contract, JsonRpcProvider } from "ethers"

const ABI = ["function symbol() view returns (string)"]

// The Aurora token contract addresses are listed below. We deploy token
// contracts all of our silos with the same address, so to confirm that a
// particular token is supported on a given silo we just need to check if a
// token contract with a particular address has been deployed.
const AURORA_TOKEN_ADDRESSES = {
  NEAR: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
  wNEAR: "0x6BB0c4d909a84d118B5e6c4b17117e79E621ae94",
  USDt: "0x80Da25Da4D783E57d2FCdA0436873A193a4BEccF",
  USDC: "0x368EBb46ACa6b8D0787C96B2b20bD3CC3F2c45F7",
  AURORA: "0x8BEc47865aDe3B172A928df8f990Bc7f2A3b9f79",
  ETH: "0x5a524251df27A25AC6b9964a93E1c23AD692688D",
} as const

/**
 * Check if the token contract address corresponds to the expected symbol.
 */
export const checkTokenByContractAddress = async (
  provider: JsonRpcProvider,
  tokenContractAddress: string,
): Promise<boolean> => {
  const contract = new Contract(tokenContractAddress, ABI, provider)

  try {
    await contract.symbol()
  } catch (error) {
    return false
  }

  return true
}

/**
 * Check if the token contract address corresponds to the expected symbol.
 */
export const checkTokenBySymbol = async (
  provider: JsonRpcProvider,
  symbol: keyof typeof AURORA_TOKEN_ADDRESSES,
): Promise<boolean> => {
  const tokenContractAddress = AURORA_TOKEN_ADDRESSES[symbol]

  return checkTokenByContractAddress(provider, tokenContractAddress)
}
