import Card from "@/components/Card"
import { AdminPage } from "@/components/AdminPage"
import { getTeams } from "@/actions/admin/teams/get-teams"
import { DealForm } from "@/app/admin/deals/DealForm"

const Page = async () => {
  const allTeams = await getTeams()

  return (
    <AdminPage title="Add token">
      <Card>
        <Card.Title tag="h3">Deal details</Card.Title>
        <div className="px-6 pb-7">
          <DealForm allTeams={allTeams} />
        </div>
      </Card>
    </AdminPage>
  )
}

export default Page
