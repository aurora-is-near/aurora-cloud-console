"use client"

import Link from "next/link"
import { Button } from "@/components/Button"
import GasAbstractionHero from "@/app/dashboard/[teamKey]/gas_abstraction/GasAbstractionHero"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"

const EmptyState = () => {
  const { team } = useRequiredContext(TeamContext)

  return (
    <div className="divide-y flex flex-col gap-10">
      <GasAbstractionHero />
      <div className="flex flex-col pt-10 gap-5">
        <span className="text-2xl text-slate-900 font-bold">
          Your Gas Plans
        </span>

        <div className="flex flex-row justify-between rounded-xl bg-slate-100 p-6">
          <div className="flex flex-col gap-2">
            <span className="text-slate-900 font-semibold text-base">
              Want to create your own plan?
            </span>
            <span className="text-sm text-slate-500">
              Set up devnet or mainnet chain on Aurora Cloud.
            </span>
          </div>
          <div className="self-center">
            <Link href={`/dashboard_v2/${team.team_key}/create_chain`}>
              <Button size="sm" variant="border">
                Create chain
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyState
