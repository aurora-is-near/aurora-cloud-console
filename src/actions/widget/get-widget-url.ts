import cleanDeep from "clean-deep"
import {
  Silo,
  SiloBridgedToken,
  Widget,
  WidgetNetworkType,
} from "@/types/types"

type CustomChain = {
  id: string
  name: string
  network: string
  nativeCurrency: {
    decimals: number
    name: string | null
    symbol: string
  }
  rpcUrl: string
  auroraEvmAccount: string
  blockExplorer?: {
    name: string
    url: string
  }
  siloToSiloBridge: string | null
  logo: string | null
}

const getNetworkEvms = (silo: Silo, networks: WidgetNetworkType[]): string[] =>
  networks.map((network) => {
    if (network === "CUSTOM") {
      return silo.engine_account
    }

    if (network === "AURORA") {
      return "aurora"
    }

    if (network === "ETHEREUM") {
      return "ethereum"
    }

    if (network === "NEAR") {
      return "near"
    }

    throw new Error(`Unknown network: ${network}`)
  })

const setTokensParam = (
  url: URL,
  { activeTokens }: { activeTokens: SiloBridgedToken[] },
) => {
  if (!activeTokens.length) {
    return
  }

  url.searchParams.set(
    "tokens",
    JSON.stringify(activeTokens.map(({ symbol }) => symbol)),
  )
}

const setCustomTokensParam = (
  url: URL,
  { activeCustomTokens }: { activeCustomTokens: SiloBridgedToken[] },
) => {
  if (!activeCustomTokens.length) {
    return
  }

  const customTokens = activeCustomTokens
    .map(
      ({
        symbol,
        name,
        decimals,
        icon_url,
        ethereum_address,
        aurora_address,
        near_address,
      }) => {
        const data = cleanDeep({
          symbol,
          name,
          decimals,
          icon: icon_url,
          ethereum: ethereum_address,
          aurora: aurora_address,
          near: near_address,
        })

        return data
      },
    )
    .filter(Boolean)

  url.searchParams.set("customTokens", JSON.stringify(customTokens))
}

const setCustomChainsParam = (url: URL, { silo }: { silo: Silo }) => {
  const customChain: CustomChain = {
    id: String(silo.chain_id),
    name: silo.name,
    network: silo.name,
    nativeCurrency: {
      decimals: silo.base_token_decimals,
      name: silo.base_token_name,
      symbol: silo.base_token_symbol,
    },
    siloToSiloBridge: silo.silo_to_silo_bridge_address,
    rpcUrl: silo.rpc_url,
    auroraEvmAccount: silo.engine_account,
    logo: silo.favicon,
  }

  if (silo.explorer_url) {
    customChain.blockExplorer = {
      name: `${silo.name} Explorer`,
      url: silo.explorer_url,
    }
  }

  url.searchParams.set("customChains", JSON.stringify([customChain]))
}

export const getWidgetUrl = ({
  silo,
  widget,
  tokens,
}: {
  silo: Silo
  widget: Widget
  tokens: SiloBridgedToken[]
}): string => {
  const activeTokens = tokens.filter((token) => token.is_active)
  const url = new URL("https://aurora.plus/cloud")

  if (widget.to_networks?.length) {
    url.searchParams.set(
      "toNetworks",
      JSON.stringify(getNetworkEvms(silo, widget.to_networks)),
    )
  }

  if (widget.from_networks?.length) {
    url.searchParams.set(
      "fromNetworks",
      JSON.stringify(getNetworkEvms(silo, widget.from_networks)),
    )
  }

  const hasCustomChain =
    !!widget.from_networks?.some((network) => network === "CUSTOM") ||
    !!widget.to_networks?.some((network) => network === "CUSTOM")

  // If a `customChain` is defined then all the tokens we want available on
  // that custom chain should be overridden using `customTokens`, which will
  // define the token's address on all the chains including the custom one.
  if (hasCustomChain) {
    setCustomChainsParam(url, { silo })
    setCustomTokensParam(url, { activeCustomTokens: activeTokens })

    return url.href
  }

  const activeCustomTokens = activeTokens.filter(({ symbol }) => {
    return !["NEAR", "AURORA", "ETH"].includes(symbol)
  })

  setTokensParam(url, { activeTokens })
  setCustomTokensParam(url, { activeCustomTokens })

  return url.href
}
