import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { getSilo } from "@/actions/silos/get-silo"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeams } from "@/actions/teams/get-teams"
import { getBlockscoutDatabases } from "@/actions/blockscout-database/get-blockscout-databases"
import { getSilosTeams } from "@/actions/silos/get-silos-teams"
import { DeleteSiloButton } from "./DeleteSiloButton"
import { SiloForm } from "../../SiloForm"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const [silo, silosTeams, blockscoutDatabases, teams] = await Promise.all([
    getSilo(id),
    getSilosTeams(),
    getBlockscoutDatabases(),
    getTeams(),
  ])

  if (!silo) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Silos", silo.name]}
      actions={<DeleteSiloButton silo={silo} />}
    >
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <Card.Body>
          <SiloForm
            silo={silo}
            teams={teams}
            blockscoutDatabases={blockscoutDatabases}
            silosTeams={silosTeams}
          />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
