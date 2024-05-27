import { DashboardPage } from "@/components/DashboardPage"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { TeamDetailsCard } from "@/components/admin/TeamDetailsCard"
import { DeleteTeamButton } from "@/app/dashboard/[teamKey]/admin/team/DeleteTeamButton"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return (
    <DashboardPage heading="Team" actions={<DeleteTeamButton team={team} />}>
      <TeamDetailsCard team={team} />
    </DashboardPage>
  )
}

export default Page
