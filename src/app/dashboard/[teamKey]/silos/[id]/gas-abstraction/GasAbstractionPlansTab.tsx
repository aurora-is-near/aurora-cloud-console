import { Deal, Silo } from "@/types/types"
import { NewPlanButton } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/NewPlanButton"
import DealItem from "./DealItem"

type GasAbstractionPlansTabProps = {
  teamKey: string
  silo: Silo
  deals: Deal[]
  isNewPlanButtonDisabled: boolean
}

export const GasAbstractionPlansTab = ({
  silo,
  teamKey,
  deals,
  isNewPlanButtonDisabled,
}: GasAbstractionPlansTabProps) => (
  <div className="flex flex-col w-full">
    <div className="mt-2 mb-6 md:flex md:flex-row gap-x-10 w-full">
      <p className="text-sm text-slate-500 max-w-2xl">
        Gas plans allow you to create custom logic about which transactions
        benefit from free transaction fees. You can configure it based on wallet
        addresses, contracts and add timeframe logic.
      </p>
      <NewPlanButton
        disabled={isNewPlanButtonDisabled}
        className="mt-5 md:mt-0 md:ml-auto"
      />
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
