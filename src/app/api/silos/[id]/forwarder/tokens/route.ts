import { JsonRpcProvider } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "@/utils/abort"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { forwarderApiClient } from "@/utils/forwarder-api/client"
import { Silo } from "@/types/types"
import { ForwarderTokenSymbol } from "@/types/forwarder-tokens"
import { checkTokenBySymbol } from "@/utils/check-token-contract"

type Token = {
  address: string
  decimals: number
  symbol: ForwarderTokenSymbol
}

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

const isKnownToken = (symbol: string): symbol is ForwarderTokenSymbol => {
  return KNOWN_TOKENS.some((known) => known.symbol === symbol)
}

const checkTokenContracts = async (silo: Silo, tokens: string[]) => {
  const provider = new JsonRpcProvider(silo.rpc_url)

  await Promise.all(
    tokens.map(async (symbol) => {
      if (!isKnownToken(symbol)) {
        abort(400, `Unknown token: ${symbol}`)
      }

      if (!(await checkTokenBySymbol(provider, symbol))) {
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
          contractDeployed: await checkTokenBySymbol(provider, symbol),
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
