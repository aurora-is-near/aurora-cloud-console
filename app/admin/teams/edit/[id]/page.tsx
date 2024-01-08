import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { getTeam } from "@/actions/admin/teams/get-team"
import { TeamForm } from "@/app/admin/teams/TeamForm"
import { AdminPage } from "@/components/AdminPage"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const team = await getTeam(id)

  if (!team) {
    notFound()
  }

  return (
    <AdminPage title={team.name}>
      <Card>
        <Card.Title tag="h3">Team details</Card.Title>
        <div className="px-6 pb-7">
          <TeamForm team={team} />
        </div>
      </Card>
    </AdminPage>
  )
}

export default Page
