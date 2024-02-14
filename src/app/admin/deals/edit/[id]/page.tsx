import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { DealForm } from "@/app/admin/deals/DealForm"
import { getDeal } from "@/actions/admin/deals/get-deal"
import { getTeams } from "@/actions/admin/teams/get-teams"
import { DealApiRequestCard } from "@/app/admin/deals/DealApiRequestCard"
import Button from "@/components/Button"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const [deal, allTeams] = await Promise.all([getDeal(id), getTeams()])

  if (!deal) {
    notFound()
  }

  return (
    <DashboardPage heading={deal.name} actions={<Button>Test</Button>}>
      <Card>
        <Card.Title tag="h3">Deal details</Card.Title>
        <Card.Body>
          <DealForm deal={deal} allTeams={allTeams} />
        </Card.Body>
      </Card>
      <DealApiRequestCard id={id} />
    </DashboardPage>
  )
}

export default Page
