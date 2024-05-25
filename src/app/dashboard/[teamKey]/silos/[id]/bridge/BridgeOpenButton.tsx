import { LinkButton, LinkButtonProps } from "@/components/LinkButton"
import { useBridgeNetworks } from "@/hooks/useBridgeNetworks"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

type BridgeOpenButtonProps = {
  siloId: number
  size?: LinkButtonProps["size"]
}

export const BridgeOpenButton = ({ siloId, size }: BridgeOpenButtonProps) => {
  const { toNetworks, fromNetworks, isPending } = useBridgeNetworks(siloId)
  const { data: silo } = useQuery(
    getQueryFnAndKey("getSilo", {
      id: siloId,
    }),
  )

  const href = useMemo(() => {
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

    // if (silo?.engineAccount) {
    //   url.searchParams.set(
    //     "customChains",
    //     JSON.stringify({
    //       id: silo.chainId,
    //       name: silo.name,
    //       network: "TPRO Network",
    //       nativeCurrency: {
    //         decimals: 18,
    //         name: "TPRO",
    //         symbol: "TPRO",
    //       },
    //       rpcUrl: silo.rpcUrl,
    //       auroraEvmAccount: silo.engineAccount,
    //       // logo: "/static/images/tpro.png",
    //     }),
    //   )
    // }

    return url.href
  }, [fromNetworks, toNetworks])

  return (
    <LinkButton
      href={href}
      target="_blank"
      className="w-full"
      disabled={isPending}
      size={size}
    >
      <span className="flex flex-row items-center">
        Open bridge
        <ArrowTopRightOnSquareIcon className="ml-2 w-6 h-6" />
      </span>
    </LinkButton>
  )
}
