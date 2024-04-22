import { Deal } from "@/types/types"
import { LinkButton } from "@/components/LinkButton"
import ToggleDeal from "../../../../../components/ToggleDeal"
import { formatDate } from "@/utils/helpers"

type DealItemProps = {
  deal: Deal
  teamKey: string
}

const DealItem = ({ deal, teamKey }: DealItemProps) => (
  <li className="p-5 sm:p-6 flex justify-between sm:items-center items-start gap-5">
    <ToggleDeal dealId={deal.id} />

    <div className="flex-1 flex items-start gap-y-3 sm:items-center justify-between sm:flex-row flex-col">
      <div>
        <h3>{deal.name}</h3>
        <p className="text-sm text-gray-500">
          Created at {formatDate(deal.created_at)}
        </p>
      </div>
      <LinkButton
        href={`/dashboard/${teamKey}/borealis/deals/${deal.id}`}
        variant="border"
        size="sm"
      >
        View
      </LinkButton>
    </div>
  </li>
)

export default DealItem
