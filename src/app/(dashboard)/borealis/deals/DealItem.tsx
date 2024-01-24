import { Deal } from "@/types/types"
import ToggleDeal from "./ToggleDeal"
import { formatDate } from "@/utils/helpers"
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline"
import { Tooltip } from "@/components/Tooltip"
import Link from "next/link"

type DealItemProps = {
  deal: Deal
}

const DealItem = ({ deal }: DealItemProps) => {
  const onIncreasePriorityClick = () => {
    console.log("increase priority")
  }

  const onDecreasePriorityClick = () => {
    console.log("decrease priority")
  }

  return (
    <li className="p-5 sm:p-6 flex justify-between sm:items-center items-start gap-5">
      <ToggleDeal dealId={deal.id} />

      <div className="flex-1 flex items-start gap-y-3 sm:items-center justify-between sm:flex-row flex-col">
        <div>
          <h3>{deal.name}</h3>
          <p className="text-sm text-gray-500">
            Created at {formatDate(new Date(deal.created_at))}
          </p>
        </div>
        <div className="flex gap-x-2">
          <Tooltip
            id={`deal-${deal.id}-increase-priority`}
            content="Increase priority"
            type="white"
          >
            <button
              onClick={onIncreasePriorityClick}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowUpCircleIcon className="ml-1 w-7 h-7" />
            </button>
          </Tooltip>
          <Tooltip
            id={`deal-${deal.id}-decrease-priority`}
            content="Decrease priority"
            type="white"
          >
            <button
              onClick={onDecreasePriorityClick}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowDownCircleIcon className="ml-1 w-7 h-7" />
            </button>
          </Tooltip>
          <Tooltip
            id={`deal-${deal.id}-decrease-priority`}
            content="View"
            type="white"
          >
            <Link
              href={`/borealis/deals/${deal.id}`}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <EyeIcon className="ml-1 w-7 h-7" />
            </Link>
          </Tooltip>
        </div>
      </div>
    </li>
  )
}

export default DealItem
