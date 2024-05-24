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
  const { data: bridge } = useQuery(
    getQueryFnAndKey("getSiloBridge", {
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
