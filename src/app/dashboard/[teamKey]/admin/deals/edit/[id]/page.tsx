import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { DealForm } from "../../DealForm"
import { getDeal } from "@/actions/deals/get-deal"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: number; teamKey: string }
}) => {
  const [deal, team] = await Promise.all([getDeal(id), getTeamByKey(teamKey)])

  if (!deal) {
    notFound()
  }

  return (
    <DashboardPage heading={deal.name}>
      <Card>
        <Card.Title tag="h3">Deal details</Card.Title>
        <Card.Body>
          <DealForm deal={deal} teamId={team.id} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
