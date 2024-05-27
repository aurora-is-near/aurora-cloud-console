import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeams } from "@/actions/teams/get-teams"
import { DealForm } from "../DealForm"

const Page = async () => {
  const allTeams = await getTeams()

  return (
    <DashboardPage heading="Add token">
      <Card>
        <Card.Title tag="h3">Deal details</Card.Title>
        <Card.Body>
          <DealForm allTeams={allTeams} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
