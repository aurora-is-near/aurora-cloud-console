import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { getTeam } from "@/actions/teams/get-team"
import { DashboardPage } from "@/components/DashboardPage"
import { TeamForm } from "@/components/admin/TeamForm"
import { DeleteTeamButton } from "./DeleteTeamButton"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const team = await getTeam(id)

  if (!team) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Teams", team.name]}
      actions={<DeleteTeamButton team={team} />}
    >
      <Card>
        <Card.Title tag="h3">Team details</Card.Title>
        <Card.Body>
          <TeamForm team={team} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
