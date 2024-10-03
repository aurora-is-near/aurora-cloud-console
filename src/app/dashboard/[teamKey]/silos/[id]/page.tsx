import { notFound } from "next/navigation"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import Dashboard from "@/app/dashboard/[teamKey]/(new)/Dashboard"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const silo = await getTeamSilo(team.id, Number(id))

  if (!silo) {
    notFound()
  }

  return (
    <DashboardPage>
      <Dashboard team={team} silo={silo} />
    </DashboardPage>
  )
}

export default Page
