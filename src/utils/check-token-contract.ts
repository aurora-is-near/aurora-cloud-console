import { Contract, JsonRpcProvider } from "ethers"
import { logger } from "@/logger"

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
} as const

/**
 * Check if the token contract address corresponds to the expected symbol.
 */
export const checkToken = async (
  provider: JsonRpcProvider,
  symbol: keyof typeof AURORA_TOKEN_ADDRESSES,
): Promise<boolean> => {
  const tokenContractAddress = AURORA_TOKEN_ADDRESSES[symbol]
  const contract = new Contract(tokenContractAddress, ABI, provider)
  let actualSymbol

  try {
    actualSymbol = await contract.symbol()
  } catch (error) {
    return false
  }

  if (actualSymbol !== symbol) {
    logger.error(
      `Expected symbol ${symbol} for token contract ${tokenContractAddress}, got ${actualSymbol}`,
    )

    return false
  }

  return true
}
