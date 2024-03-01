import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { DealForm } from "@/app/admin/deals/DealForm"
import { getDeal } from "@/actions/deals/get-deal"
import { getTeams } from "@/actions/teams/get-teams"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const [deal, allTeams] = await Promise.all([getDeal(id), getTeams()])

  if (!deal) {
    notFound()
  }

  return (
    <DashboardPage heading={deal.name}>
      <Card>
        <Card.Title tag="h3">Deal details</Card.Title>
        <Card.Body>
          <DealForm deal={deal} allTeams={allTeams} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
