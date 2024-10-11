import { redirect } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { DashboardHomePage } from "@/app/dashboard/[teamKey]/(new)/Dashboard"

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

  // If the team has no silos return the "empty" state
  return <DashboardHomePage team={team} />
}

export default Page
