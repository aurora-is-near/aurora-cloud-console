import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import { LinkButton } from "@/components/LinkButton"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { SiloContext } from "@/providers/SiloProvider"
import { TeamContext } from "@/providers/TeamProvider"

export const DeploymentProgressComplete = () => {
  const { silo } = useRequiredContext(SiloContext)
  const { team } = useRequiredContext(TeamContext)

  return (
    <div className="flex gap-3">
      {!!silo.explorer_url && (
        <LinkButton
          isExternal
          size="lg"
          variant="primary"
          href={silo.explorer_url}
        >
          Open Block Explorer
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </LinkButton>
      )}
      <LinkButton
        size="lg"
        variant="border"
        href={`/dashboard/${team.team_key}/silos/${silo.id}/block-explorer`}
      >
        Customize Block Explorer
      </LinkButton>
    </div>
  )
}
