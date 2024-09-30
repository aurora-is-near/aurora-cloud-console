import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { SiloForm } from "../SiloForm"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return (
    <DashboardPage heading="Add silo">
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <Card.Body>
          <SiloForm teamId={team.id} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
