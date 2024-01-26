import { Deal } from "@/types/types"
import Button from "@/components/Button"
import ToggleDeal from "./ToggleDeal"
import { formatDate } from "@/utils/helpers"

type DealItemProps = {
  deal: Deal
}

const DealItem = ({ deal }: DealItemProps) => (
  <li className="p-5 sm:p-6 flex justify-between sm:items-center items-start gap-5">
    <ToggleDeal dealId={deal.id} />

    <div className="flex-1 flex items-start gap-y-3 sm:items-center justify-between sm:flex-row flex-col">
      <div>
        <h3>{deal.name}</h3>
        <p className="text-sm text-gray-500">
          Created at {formatDate(new Date(deal.created_at))}
        </p>
      </div>
      <Button href={`/borealis/deals/${deal.id}`} style="border" size="sm">
        View
      </Button>
    </div>
  </li>
)

export default DealItem
