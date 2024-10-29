import { Deal, Silo } from "@/types/types"
import DealItem from "./DealItem"

type GasAbstractionPlansTabProps = {
  teamKey: string
  silo: Silo
  deals: Deal[]
}

export const GasAbstractionPlansTab = ({
  silo,
  teamKey,
  deals,
}: GasAbstractionPlansTabProps) => (
  <div className="flex flex-col">
    <div className="mt-2 mb-6">
      <p className="text-sm text-slate-500">
        Gas plans allow you to create custom logic about which transactions
        benefit from free transaction fees. You can configure it based on wallet
        addresses, contracts and add timeframe logic.
      </p>
    </div>
    <div className="flex flex-col gap-5">
      <ul className="grid gap-4 divide-gray-200">
        {deals.map((deal) => (
          <DealItem key={deal.id} deal={deal} silo={silo} teamKey={teamKey} />
        ))}
      </ul>
    </div>
  </div>
)
