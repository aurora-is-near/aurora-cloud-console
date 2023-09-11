import Card from "@/components/Card"
import DealItem from "./DealItem"
import { getDeals } from "@/mockApi"

const DealsList = async () => {
  const deals = await getDeals()

  return (
    <Card className="divide-y divide-gray-200" tag="ul" role="list">
      {deals.map((deal) => (
        <DealItem key={deal.id} {...deal} />
      ))}
    </Card>
  )
}

export default DealsList
