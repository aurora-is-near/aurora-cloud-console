import { Button } from "@/components/Button"
import GasAbstractionHero from "@/app/dashboard_v2/[teamKey]/gas_abstraction/GasAbstractionHero"
import { Team } from "@/types/types"

const EmptyState = ({ team }: { team: Team }) => {
  return (
    <div className="divide-y flex flex-col gap-10">
      <GasAbstractionHero team={team} deals={[]} />
      <div className="flex flex-col pt-10 gap-5">
        <span className="text-2xl text-slate-900 font-bold">
          Your Gas Plans
        </span>

        <div className="flex flex-row justify-between rounded-xl bg-slate-100 p-6">
          <div className="flex flex-col gap-2">
            <span className="text-slate-900 font-semibold text-[16px]">
              Want to create your own plan?
            </span>
            <span className="text-sm text-slate-500">
              Set up devnet or mainnet chain on Aurora Cloud.
            </span>
          </div>
          <div className="self-center">
            <Button size="sm" variant="border">
              Create chain
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyState
