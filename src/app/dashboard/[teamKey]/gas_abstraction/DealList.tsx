import ToggleDeal from "@/components/ToggleDeal"
import { formatDate } from "@/utils/helpers"
import { LinkButton } from "@/components/LinkButton"
import { Deal, Team } from "@/types/types"
import Card from "@/components/Card"

interface DealListProps {
  team: Team
  deals: Deal[]
}

const DealList = ({ team, deals }: DealListProps) => {
  return deals.map((deal: Deal) => (
    <Card
      key={deal.id}
      className="p-5 sm:p-6 flex justify-between sm:items-center items-start gap-5"
    >
      <ToggleDeal dealId={deal.id} />

      <div className="flex-1 flex items-start gap-y-3 sm:items-center justify-between sm:flex-row flex-col">
        <div>
          <h3>{deal.name}</h3>
          <p className="text-sm text-gray-500">
            Created at {formatDate(deal.created_at)}
          </p>
        </div>
        <LinkButton
          href={`/dashboard/${team.team_key}/gas_abstraction/${deal.id}`}
          variant="border"
          size="sm"
        >
          View
        </LinkButton>
      </div>
    </Card>
  ))
}

export default DealList
