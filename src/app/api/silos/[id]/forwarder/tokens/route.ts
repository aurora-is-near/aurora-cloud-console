import { Contract, JsonRpcProvider } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "@/utils/abort"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { logger } from "@/logger"
import { forwarderApiClient } from "@/utils/forwarder-api/client"
import { Silo } from "@/types/types"
import { ForwarderTokenSymbol } from "@/types/forwarder-tokens"

type Token = {
  address: string
  decimals: number
  symbol: ForwarderTokenSymbol
}

const ABI = ["function symbol() view returns (string)"]

// These are the tokens potentially supported by the forwarder. The address is
// the token's NEAR contract address.
const KNOWN_TOKENS: Token[] = [
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
const AURORA_TOKEN_ADDRESSES: Record<ForwarderTokenSymbol, string> = {
  NEAR: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
  wNEAR: "0x6BB0c4d909a84d118B5e6c4b17117e79E621ae94",
  USDt: "0x80Da25Da4D783E57d2FCdA0436873A193a4BEccF",
  USDC: "0x368EBb46ACa6b8D0787C96B2b20bD3CC3F2c45F7",
  AURORA: "0x8BEc47865aDe3B172A928df8f990Bc7f2A3b9f79",
}

const isKnownToken = (symbol: string): symbol is ForwarderTokenSymbol => {
  return KNOWN_TOKENS.some((known) => known.symbol === symbol)
}

/**
 * Check if the token contract address corresponds to the expected symbol.
 */
const checkToken = async (
  provider: JsonRpcProvider,
  symbol: ForwarderTokenSymbol,
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

const checkTokenContracts = async (silo: Silo, tokens: string[]) => {
  const provider = new JsonRpcProvider(silo.rpc_url)

  await Promise.all(
    tokens.map(async (symbol) => {
      if (!isKnownToken(symbol)) {
        abort(400, `Unknown token: ${symbol}`)
      }

      if (!(await checkToken(provider, symbol))) {
        abort(400, `Token contract not deployed: ${symbol}`)
      }
    }),
  )
}

const addTokens = async (silo: Silo, tokens: string[]) => {
  if (!tokens.length) {
    return
  }

  await forwarderApiClient.addSupportedToken({
    target_network: silo.engine_account,
    tokens: tokens.map((symbol) => {
      const { address, decimals } =
        KNOWN_TOKENS.find((token) => token.symbol === symbol) ?? {}

      if (!address || !decimals) {
        abort(400, `Unknown token: ${symbol}`)
      }

      return { address, decimals, symbol }
    }),
  })
}

const removeTokens = async (silo: Silo, tokens: string[]) => {
  if (!tokens.length) {
    return
  }

  await forwarderApiClient.removeSupportedToken({
    target_network: silo.engine_account,
    token_addresses: tokens.map((symbol) => {
      const { address } =
        KNOWN_TOKENS.find((token) => token.symbol === symbol) ?? {}

      if (!address) {
        abort(400, `Unknown token: ${symbol}`)
      }

      return address
    }),
  })
}

export const GET = createApiEndpoint(
  "getForwarderTokens",
  async (_req, ctx) => {
    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const provider = new JsonRpcProvider(silo.rpc_url)
    const {
      result: { tokens: supportedTokens },
    } = await forwarderApiClient.getSupportedTokens({
      target_network: silo.engine_account,
    })

    return {
      items: await Promise.all(
        KNOWN_TOKENS.map(async ({ symbol, decimals }) => ({
          symbol,
          decimals,
          contractDeployed: await checkToken(provider, symbol),
          enabled: (supportedTokens ?? []).some(
            (token) => token.symbol === symbol,
          ),
        })),
      ),
    }
  },
)

export const POST = createApiEndpoint(
  "addForwarderTokens",
  async (_req, ctx) => {
    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const { tokens } = ctx.body

    await checkTokenContracts(silo, tokens)
    await addTokens(silo, tokens)

    return {
      status: "ok",
    }
  },
)

export const DELETE = createApiEndpoint(
  "removeForwarderTokens",
  async (_req, ctx) => {
    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const { tokens } = ctx.body

    await checkTokenContracts(silo, tokens)
    await removeTokens(silo, tokens)

    return {
      status: "ok",
    }
  },
)

export const PUT = createApiEndpoint(
  "updateForwarderTokens",
  async (_req, ctx) => {
    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const { tokens } = ctx.body

    const {
      result: { tokens: currentTokens },
    } = await forwarderApiClient.getSupportedTokens({
      target_network: silo.engine_account,
    })

    const currentTokenSymbols = (currentTokens ?? []).map(
      (token) => token.symbol,
    )

    const tokensToRemove = currentTokenSymbols.filter(
      (symbol) => !tokens.includes(symbol),
    )

    const tokensToAdd = tokens.filter(
      (symbol) => !currentTokenSymbols.includes(symbol),
    )

    await checkTokenContracts(silo, tokensToAdd)

    await Promise.all([
      addTokens(silo, tokensToAdd),
      removeTokens(silo, tokensToRemove),
    ])

    return {
      status: "ok",
    }
  },
)
