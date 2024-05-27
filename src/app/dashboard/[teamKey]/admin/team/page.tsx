import { DashboardPage } from "@/components/DashboardPage"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { TeamDetailsCard } from "@/components/admin/TeamDetailsCard"
import { RemoveTeamButton } from "@/app/dashboard/[teamKey]/admin/team/RemoveTeamButton"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return (
    <DashboardPage
      heading={team.name}
      actions={<RemoveTeamButton team={team} />}
    >
      <TeamDetailsCard team={team} />
    </DashboardPage>
  )
}

export default Page
