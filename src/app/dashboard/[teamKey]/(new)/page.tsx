import { redirect } from "next/navigation"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import Dashboard from "@/app/dashboard/[teamKey]/(new)/Dashboard"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const [silo] = await getTeamSilos(team.id)

  if (silo) {
    redirect(`/dashboard/${teamKey}/silos/${silo.id}`)
  }

  return (
    <DashboardPage>
      <Dashboard team={team} />
    </DashboardPage>
  )
}

export default Page
