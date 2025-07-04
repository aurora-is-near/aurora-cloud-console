import cleanDeep from "clean-deep"
import {
  Silo,
  SiloBridgedToken,
  Widget,
  WidgetNetworkType,
} from "@/types/types"
import { BASE_TOKEN_PLACEHOLDER_ADDRESS } from "@/constants/base-token"

type CustomChain = {
  id: number
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

const getNetworkKeys = (silo: Silo, networks: WidgetNetworkType[]): string[] =>
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

const getNetworkAddress = (
  address: string | null,
  symbol: string,
  nativeCurrencySymbol: string,
) => {
  if (symbol.toUpperCase() === nativeCurrencySymbol.toUpperCase()) {
    return BASE_TOKEN_PLACEHOLDER_ADDRESS
  }

  return address
}

const setCustomTokensParam = (
  url: URL,
  {
    silo,
    activeCustomTokens,
  }: { silo: Silo; activeCustomTokens: SiloBridgedToken[] },
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
        silo_address,
        near_address,
      }) => {
        const data = cleanDeep({
          symbol,
          name,
          decimals,
          icon: icon_url,
          ethereum: getNetworkAddress(ethereum_address, symbol, "ETH"),
          aurora: getNetworkAddress(aurora_address, symbol, "ETH"),
          near: getNetworkAddress(near_address, symbol, "NEAR"),
          [silo.engine_account]: getNetworkAddress(
            silo_address,
            symbol,
            silo.base_token_symbol,
          ),
        })

        return data
      },
    )
    .filter(Boolean)

  url.searchParams.set("customTokens", JSON.stringify(customTokens))
}

const setCustomChainsParam = (url: URL, { silo }: { silo: Silo }) => {
  const customChain: CustomChain = {
    id: silo.chain_id,
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
  const activeTokens = tokens.filter((token) =>
    widget.tokens.includes(token.id),
  )

  const url = new URL("https://aurora.plus/cloud")

  url.searchParams.set(
    "toNetworks",
    JSON.stringify(getNetworkKeys(silo, widget.to_networks ?? [])),
  )

  url.searchParams.set(
    "fromNetworks",
    JSON.stringify(getNetworkKeys(silo, widget.from_networks ?? [])),
  )

  const hasCustomChain =
    !!widget.from_networks?.some((network) => network === "CUSTOM") ||
    !!widget.to_networks?.some((network) => network === "CUSTOM")

  if (hasCustomChain) {
    setCustomChainsParam(url, { silo })
  }

  setCustomTokensParam(url, { silo, activeCustomTokens: activeTokens })

  return url.href
}
