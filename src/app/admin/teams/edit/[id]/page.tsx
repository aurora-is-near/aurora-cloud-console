import { notFound } from "next/navigation"
import { getTeam } from "@/actions/admin/teams/get-team"
import { DashboardPage } from "@/components/DashboardPage"
import { TeamDetailsCard } from "@/app/admin/teams/TeamDetailsCard"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getSilos } from "@/actions/admin/silos/get-silos"
import { Test } from "@/app/admin/teams/edit/[id]/Test"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const [team, teamSilos, allSilos] = await Promise.all([
    getTeam(Number(id)),
    getTeamSilos(Number(id)),
    getSilos(),
  ])

  if (!team) {
    notFound()
  }

  return (
    <DashboardPage heading={team.name} actions={<Test id={Number(id)} />}>
      <TeamDetailsCard team={team} teamSilos={teamSilos} allSilos={allSilos} />
    </DashboardPage>
  )
}

export default Page
