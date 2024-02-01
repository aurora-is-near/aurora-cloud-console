import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { DealForm } from "@/app/admin/deals/DealForm"
import { getDeal } from "@/actions/admin/deals/get-deal"
import { getTeams } from "@/actions/admin/teams/get-teams"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const [deal, allTeams] = await Promise.all([getDeal(id), getTeams()])

  if (!deal) {
    notFound()
  }

  return (
    <DashboardPage heading={deal.name}>
      <Card>
        <Card.Title tag="h3">Deal details</Card.Title>
        <div className="px-6 pb-7">
          <DealForm deal={deal} allTeams={allTeams} />
        </div>
      </Card>
    </DashboardPage>
  )
}

export default Page
