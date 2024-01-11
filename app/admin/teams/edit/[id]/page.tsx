import { notFound } from "next/navigation"
import { getTeam } from "@/actions/admin/teams/get-team"
import { AdminPage } from "@/components/AdminPage"
import { TeamDetailsCard } from "@/app/admin/teams/TeamDetailsCard"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const team = await getTeam(id)

  if (!team) {
    notFound()
  }

  return (
    <AdminPage title={team.name}>
      <TeamDetailsCard team={team} />
    </AdminPage>
  )
}

export default Page
