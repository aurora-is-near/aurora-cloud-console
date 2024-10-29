import { PlusIcon } from "@heroicons/react/20/solid"
import { Deal, Silo } from "@/types/types"
import { Button } from "@/components/Button"
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
  <div className="flex flex-col w-full">
    <div className="mt-2 mb-6 md:flex md:flex-row gap-x-10 w-full">
      <p className="text-sm text-slate-500 max-w-2xl">
        Gas plans allow you to create custom logic about which transactions
        benefit from free transaction fees. You can configure it based on wallet
        addresses, contracts and add timeframe logic.
      </p>
      <Button className="mt-5 md:mt-0 md:ml-auto">
        <div className="flex w-full items-center gap-x-2">
          <PlusIcon className="w-6 h-6" />
          New plan
        </div>
      </Button>
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
