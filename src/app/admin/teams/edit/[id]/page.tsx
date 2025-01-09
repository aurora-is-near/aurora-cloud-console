import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { getTeam } from "@/actions/teams/get-team"
import { DashboardPage } from "@/components/DashboardPage"
import { TeamForm } from "@/components/admin/TeamForm"
import { getTeamOrders } from "@/actions/orders/get-team-orders"
import { LinkButton } from "@/components/LinkButton"
import { DeleteTeamButton } from "./DeleteTeamButton"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const [team, orders] = await Promise.all([getTeam(id), getTeamOrders(id)])

  if (!team) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Teams", team.name]}
      actions={<DeleteTeamButton team={team} />}
    >
      <Card>
        <Card.Title tag="h3">Team details</Card.Title>
        <Card.Body>
          <TeamForm team={team} />
        </Card.Body>
      </Card>
      <div className="grid md:grid-cols-3 md:gap-8 gap-4">
        <Card>
          <div className="flex flex-col items-center justify-center">
            <Card.Title tag="h3">Order history</Card.Title>
            <Card.Subtitle>
              {" "}
              {orders.length ? `${orders.length} orders` : "No orders"}
            </Card.Subtitle>
          </div>
          <LinkButton
            variant="border"
            className="mt-4 ml-auto"
            href={`/admin/orders?team=${team.id}`}
          >
            View orders
          </LinkButton>
        </Card>
      </div>
    </DashboardPage>
  )
}

export default Page
