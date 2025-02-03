import { BASE_TOKEN_DECIMALS } from "@/constants/base-token"
import { Silo, Token, Widget, WidgetNetworkType } from "@/types/types"

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
  { activeTokens }: { activeTokens: Token[] },
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
  { activeCustomTokens }: { activeCustomTokens: Token[] },
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
        bridge_origin,
        fast_bridge,
        bridge_addresses,
      }) => {
        const data = {
          symbol,
          name,
          decimals,
          origin: bridge_origin,
          isFast: fast_bridge,
          icon: icon_url,
          ...bridge_addresses?.reduce((acc, bridgeAddress) => {
            const [network, address] = bridgeAddress.split(":")

            return {
              ...acc,
              [network]: address,
            }
          }, {}),
        }

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
      decimals: BASE_TOKEN_DECIMALS,
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
  tokens: Token[]
}): string => {
  const activeTokens = tokens.filter(
    (token) =>
      token.silo_id === silo.id &&
      token.bridge_deployment_status === "DEPLOYED",
  )

  const url = new URL(
    "https://aurora-plus-git-cloud-bridge-auroraisnear.vercel.app/cloud",
  )

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
