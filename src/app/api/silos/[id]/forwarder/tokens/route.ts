import { Contract, JsonRpcProvider } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "@/utils/abort"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { logger } from "@/logger"
import { FORWARDER_TOKENS } from "@/constants/forwarder-tokens"
import { forwarderApiClient } from "@/utils/forwarder-api/client"
import { Silo } from "@/types/types"

type TokenSymbol = (typeof FORWARDER_TOKENS)[number]

type Token = {
  address: string
  decimals: number
  symbol: TokenSymbol
}

const ABI = ["function symbol() view returns (string)"]

// These are the tokens potentially supported by the forwarder. The address is
// the token's NEAR contract address.
const AVAILABLE_TOKENS: Token[] = [
  {
    address: "near",
    decimals: 24,
    symbol: "NEAR",
  },
  {
    address: "wrap.near",
    decimals: 24,
    symbol: "wNEAR",
  },
  {
    address: "usdt.tether-token.near",
    decimals: 6,
    symbol: "USDt",
  },
  {
    address: "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
    decimals: 6,
    symbol: "USDC",
  },
  {
    address: "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    decimals: 18,
    symbol: "AURORA",
  },
]

// The Aurora token contract addresses are listed below. We deploy token
// contracts all of our silos with the same address, so to confirm that a
// particular token is supported on a given silo we just need to check if a
// token contract with a particular address has been deployed.
const AURORA_TOKEN_ADDRESSES: Record<TokenSymbol, string> = {
  NEAR: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
  wNEAR: "0x6BB0c4d909a84d118B5e6c4b17117e79E621ae94",
  USDt: "0x80Da25Da4D783E57d2FCdA0436873A193a4BEccF",
  USDC: "0x368EBb46ACa6b8D0787C96B2b20bD3CC3F2c45F7",
  AURORA: "0x8BEc47865aDe3B172A928df8f990Bc7f2A3b9f79",
}

/**
 * Check if the token contract address corresponds to the expected symbol.
 */
const checkToken = async (
  provider: JsonRpcProvider,
  symbol: TokenSymbol,
): Promise<TokenSymbol | null> => {
  const tokenContractAddress = AURORA_TOKEN_ADDRESSES[symbol]
  const contract = new Contract(tokenContractAddress, ABI, provider)
  let actualSymbol

  try {
    actualSymbol = await contract.symbol()
  } catch (error) {
    return null
  }

  if (actualSymbol !== symbol) {
    logger.error(
      `Expected symbol ${symbol} for token contract ${tokenContractAddress}, got ${actualSymbol}`,
    )

    return null
  }

  return symbol
}

const getAvailableTokens = async (silo: Silo): Promise<TokenSymbol[]> => {
  const provider = new JsonRpcProvider(silo.rpc_url)

  const availableTokens = await Promise.all(
    FORWARDER_TOKENS.map((symbol) => checkToken(provider, symbol)),
  )

  return availableTokens.filter((token): token is TokenSymbol => token !== null)
}

export const GET = createApiEndpoint(
  "getForwarderTokens",
  async (_req, ctx) => {
    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const [availableTokens, supportedTokens] = await Promise.all([
      getAvailableTokens(silo),
      forwarderApiClient.getSupportedTokens(),
    ])

    return {
      items: availableTokens.map((symbol) => ({
        symbol,
        enabled: supportedTokens.includes(symbol),
      })),
    }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)
