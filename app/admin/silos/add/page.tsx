import Card from "@/components/Card"
import { SiloForm } from "@/app/admin/silos/SiloForm"
import { AdminPage } from "@/components/AdminPage"
import { getTeams } from "@/actions/admin/teams/get-teams"

const Page = async () => {
  const teams = await getTeams()

  return (
    <AdminPage title="Add silo">
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <div className="px-6 pb-7">
          <SiloForm teams={teams} />
        </div>
      </Card>
    </AdminPage>
  )
}

export default Page
