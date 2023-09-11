import { Deal } from "@/types/types"
import Button from "@/components/Button"
import ToggleDeal from "./ToggleDeal"

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)

const DealItem = ({ id, name, created_at }: Deal) => (
  <li className="p-5 sm:p-6 flex justify-between sm:items-center items-start gap-5">
    <ToggleDeal dealId={id} />

    <div className="flex-1 flex items-start gap-y-3 sm:items-center justify-between sm:flex-row flex-col">
      <div>
        <h3>{name}</h3>
        <p className="text-sm text-gray-500">
          Created at {formatDate(new Date(created_at))}
        </p>
      </div>
      <Button href={`/borealis/deals/${id}`} style="border" size="sm">
        View
      </Button>
    </div>
  </li>
)

export default DealItem
