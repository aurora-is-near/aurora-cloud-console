import { notFound } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { DashboardHomePage } from "@/app/dashboard/[teamKey]/(new)/Dashboard"

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

  return <DashboardHomePage team={team} silo={silo} />
}

export default Page
