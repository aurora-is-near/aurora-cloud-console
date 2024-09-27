"use client"

import EmptyState from "@/app/dashboard_v2/[teamKey]/gas_abstraction/EmptyState"
import GasAbstractionHero from "@/app/dashboard_v2/[teamKey]/gas_abstraction/GasAbstractionHero"
import DealList from "@/app/dashboard_v2/[teamKey]/gas_abstraction/DealList"
import Contact from "@/components/Contact"
import SubTitle from "@/components/dashboard/SubTitle"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"

const GasAbstractionPage = () => {
  const { team, deals } = useRequiredContext(TeamContext)

  return (
    <div>
      {deals.length > 0 ? (
        <div className="divide-y flex flex-col gap-10">
          <GasAbstractionHero />
          <div className="flex flex-col pt-10 gap-5">
            <SubTitle>Your gas plans</SubTitle>
            <DealList team={team} deals={deals} />

            <div className="mt-10">
              <Contact
                text="Need help configuring your plans?"
                teamKey={team.team_key}
              />
            </div>
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

export default GasAbstractionPage
