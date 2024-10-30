import { Silo, Token, Widget, WidgetNetworkType } from "@/types/types"

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

export const getWidgetUrl = ({
  silo,
  widget,
  tokens,
}: {
  silo: Silo
  widget: Widget
  tokens: Token[]
}): string => {
  const baseToken = tokens.find((token) => token.id === silo.base_token_id)
  const activeTokens = tokens.filter(
    (token) =>
      token.silo_id === silo.id &&
      token.bridge_deployment_status === "DEPLOYED",
  )

  const url = new URL(
    "https://aurora-plus-git-cloud-bridge-auroraisnear.vercel.app/cloud",
  )

  if (widget.to_networks) {
    url.searchParams.set(
      "toNetworks",
      JSON.stringify(getNetworkEvms(silo, widget.to_networks)),
    )
  }

  if (widget.from_networks) {
    url.searchParams.set(
      "fromNetworks",
      JSON.stringify(getNetworkEvms(silo, widget.from_networks)),
    )
  }

  const hasCustomChain =
    !!widget.from_networks?.some((network) => network === "CUSTOM") ||
    !!widget.to_networks?.some((network) => network === "CUSTOM")

  if (hasCustomChain && silo && baseToken) {
    url.searchParams.set(
      "customChains",
      JSON.stringify([
        {
          id: silo.chain_id,
          name: silo.name,
          network: silo.name,
          nativeCurrency: {
            decimals: baseToken.decimals ?? 18,
            name: baseToken.name,
            symbol: baseToken.symbol,
          },
          rpcUrl: silo.rpc_url,
          auroraEvmAccount: silo.engine_account,
        },
      ]),
    )
  }

  if (activeTokens.length) {
    url.searchParams.set(
      "tokens",
      JSON.stringify(activeTokens.map(({ symbol }) => symbol)),
    )
  }

  const activeCustomTokens = activeTokens.filter(
    ({ symbol }) => !["NEAR", "AURORA", "ETH"].includes(symbol),
  )

  if (activeCustomTokens.length) {
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
          if (!widget) {
            return null
          }

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

  return url.href
}
