import Card from "@/components/Card"
import DealItem from "./DealItem"
import { getCurrentTeamDeals } from "@/actions/current-team/get-current-team-deals"

const DealsList = async () => {
  const deals = await getCurrentTeamDeals()

  return (
    <Card className="divide-y divide-gray-200" tag="ul" role="list">
      {deals.map((deal) => (
        <DealItem key={deal.id} deal={deal} />
      ))}
    </Card>
  )
}

export default DealsList
