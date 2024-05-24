import { LinkButton, LinkButtonProps } from "@/components/LinkButton"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"

type BridgeOpenButtonProps = {
  siloId: number
  size?: LinkButtonProps["size"]
}

export const BridgeOpenButton = ({ siloId, size }: BridgeOpenButtonProps) => {
  const { data: bridge, isPending } = useQuery(
    getQueryFnAndKey("getSiloBridge", {
      id: siloId,
    }),
  )

  return (
    <LinkButton
      href="https://aurora-plus-git-cloud-bridge-auroraisnear.vercel.app/cloud"
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
