import { Button } from "@/components/Button"
import { LinkButtonProps } from "@/components/LinkButton"
import { useBridgeNetworks } from "@/hooks/useBridgeNetworks"
import { useBridgeTokens } from "@/hooks/useBridgeTokens"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"

type BridgeOpenButtonProps = {
  siloId: number
  size?: LinkButtonProps["size"]
}

export const BridgeOpenButton = ({ siloId, size }: BridgeOpenButtonProps) => {
  const {
    toNetworks,
    fromNetworks,
    isPending: isBridgeNetworksPending,
  } = useBridgeNetworks(siloId)

  const { activeTokens, isPending: isBridgeTokensPending } =
    useBridgeTokens(siloId)

  const { data: silo } = useQuery(
    getQueryFnAndKey("getSilo", {
      id: siloId,
    }),
  )

  const onClick = useCallback(() => {
    const url = new URL(
      "https://aurora-plus-git-cloud-bridge-auroraisnear.vercel.app/cloud",
    )

    url.searchParams.set(
      "toNetworks",
      JSON.stringify(toNetworks.map(({ evm }) => evm).filter(Boolean)),
    )

    url.searchParams.set(
      "fromNetworks",
      JSON.stringify(fromNetworks.map(({ evm }) => evm).filter(Boolean)),
    )

    const hasCustomChain =
      fromNetworks.some(({ key }) => key === "CUSTOM") ||
      toNetworks.some(({ key }) => key === "CUSTOM")

    if (hasCustomChain && silo && silo.nativeToken) {
      url.searchParams.set(
        "customChains",
        JSON.stringify([
          {
            id: silo.chainId,
            name: silo.name,
            network: silo.name,
            nativeCurrency: {
              decimals: silo.nativeToken.decimals || 18,
              name: silo.nativeToken.name,
              symbol: silo.nativeToken?.symbol,
            },
            rpcUrl: silo.rpcUrl,
            auroraEvmAccount: silo.engineAccount,
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
        .map(({ symbol, name, decimals, iconUrl, bridge }) => {
          if (!bridge) {
            return null
          }

          const data = {
            symbol,
            name,
            decimals,
            origin: bridge.origin,
            isFast: bridge.isFast,
            icon: iconUrl,
            ...bridge.addresses.reduce(
              (acc, { network, address }) => ({
                ...acc,
                [network]: address,
              }),
              {},
            ),
          }

          return data
        })
        .filter(Boolean)

      url.searchParams.set("customTokens", JSON.stringify(customTokens))

      window.open(
        url.href,
        "newwindow",
        `width=${600},height=${800},left=${window.screen.width / 2 - 300},top=${
          window.screen.height / 2 - 400
        }`,
      )
    }

    return url.href
  }, [fromNetworks, silo, toNetworks, activeTokens])

  return (
    <Button
      onClick={onClick}
      className="w-full"
      disabled={isBridgeNetworksPending ?? isBridgeTokensPending}
      size={size}
    >
      <span className="flex flex-row items-center">
        Open bridge
        <ArrowTopRightOnSquareIcon className="ml-2 w-6 h-6" />
      </span>
    </Button>
  )
}
