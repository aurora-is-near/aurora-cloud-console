import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeams } from "@/actions/teams/get-teams"
import { getBlockscoutDatabases } from "@/actions/blockscout-database/get-blockscout-databases"
import { SiloForm } from "../SiloForm"

const Page = async () => {
  const [teams, blockscoutDatabases] = await Promise.all([
    getTeams(),
    getBlockscoutDatabases(),
  ])

  return (
    <DashboardPage heading="Add silo">
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <Card.Body>
          <SiloForm teams={teams} blockscoutDatabases={blockscoutDatabases} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
