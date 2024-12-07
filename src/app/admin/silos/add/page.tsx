import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeams } from "@/actions/teams/get-teams"
import { SiloForm } from "../SiloForm"

const Page = async () => {
  const teams = await getTeams()

  return (
    <DashboardPage heading="Add silo">
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <Card.Body>
          <SiloForm teams={teams} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
