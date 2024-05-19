import { LinkButton } from "@/components/LinkButton"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"

export const BridgeOpenButton = ({ siloId }: { siloId: number }) => {
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
      size="lg"
    >
      <span className="flex flex-row items-center">
        Open bridge
        <ArrowTopRightOnSquareIcon className="ml-2 w-6 h-6" />
      </span>
    </LinkButton>
  )
}
