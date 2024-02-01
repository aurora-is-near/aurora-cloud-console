import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeams } from "@/actions/admin/teams/get-teams"
import { DealForm } from "@/app/admin/deals/DealForm"

const Page = async () => {
  const allTeams = await getTeams()

  return (
    <DashboardPage heading="Add token">
      <Card>
        <Card.Title tag="h3">Deal details</Card.Title>
        <div className="px-6 pb-7">
          <DealForm allTeams={allTeams} />
        </div>
      </Card>
    </DashboardPage>
  )
}

export default Page
