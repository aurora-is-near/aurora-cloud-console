import { DashboardPage } from "@/components/DashboardPage"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import Dashboard from "@/app/dashboard/[teamKey]/Dashboard"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const silos = await getTeamSilos(team.id)

  return (
    <DashboardPage>
      <Dashboard team={team} silos={silos} />
    </DashboardPage>
  )
}

export default Page
