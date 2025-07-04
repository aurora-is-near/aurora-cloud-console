import { Deal, Silo } from "@/types/types"
import { LinkButton } from "@/components/LinkButton"
import { formatDate } from "@/utils/helpers"
import Card from "@/components/Card"
import ToggleDeal from "../../../../../../components/ToggleDeal"

type DealItemProps = {
  deal: Deal
  silo: Silo
  teamKey: string
}

const DealItem = ({ deal, silo, teamKey }: DealItemProps) => (
  <Card className="flex justify-between sm:items-center items-start gap-5">
    <ToggleDeal dealId={deal.id} />

    <div className="flex-1 flex items-start gap-y-3 sm:items-center justify-between sm:flex-row flex-col">
      <div>
        <h3 className="text-slate-900">{deal.name}</h3>
        <p className="text-sm text-slate-500">
          Created at {formatDate(deal.created_at)}
        </p>
      </div>
      <div className="flex flex-row gap-x-4">
        <LinkButton
          href={`/dashboard/${teamKey}/silos/${silo.id}/gas-abstraction/${deal.id}`}
          variant="border"
        >
          View
        </LinkButton>
      </div>
    </div>
  </Card>
)

export default DealItem
