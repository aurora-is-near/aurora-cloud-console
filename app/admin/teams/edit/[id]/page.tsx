import { notFound } from "next/navigation"
import { getTeam } from "@/actions/admin/teams/get-team"
import { AdminPage } from "@/components/AdminPage"
import { TeamDetailsCard } from "@/app/admin/teams/TeamDetailsCard"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getSilos } from "@/actions/admin/silos/get-silos"

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
    <AdminPage title={team.name}>
      <TeamDetailsCard team={team} teamSilos={teamSilos} allSilos={allSilos} />
    </AdminPage>
  )
}

export default Page
