import Card from "@/components/Card"
import DealItem from "./DealItem"
import { getTeamDeals } from "@/actions/team-deals/get-team-deals"
import { headers } from "next/headers"
import { getCurrentTeam } from "@/utils/current-team"

const DealsList = async () => {
  const team = await getCurrentTeam(headers())
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
