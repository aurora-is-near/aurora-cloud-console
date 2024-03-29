import Card from "@/components/Card"
import DealItem from "./DealItem"
import { getTeamDeals } from "@/actions/team-deals/get-team-deals"
import { Team } from "@/types/types"

type DealsListProps = {
  team: Team
}

const DealsList = async ({ team }: DealsListProps) => {
  const deals = await getTeamDeals(team.id)

  return (
    <Card className="divide-y divide-gray-200" tag="ul" role="list">
      {deals.map((deal) => (
        <DealItem key={deal.id} deal={deal} />
      ))}
    </Card>
  )
}

export default DealsList
