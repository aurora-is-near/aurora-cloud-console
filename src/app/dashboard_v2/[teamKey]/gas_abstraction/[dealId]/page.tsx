"use client"

import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { DealsTransactionsCharts } from "@/app/dashboard_v2/[teamKey]/monitoring/DealsTransactionsChart"
import { FiltersCard } from "@/app/dashboard/[teamKey]/borealis/deals/[id]/FiltersCard"
import { ControlCard } from "@/app/dashboard/[teamKey]/borealis/deals/[id]/ControlCard"
import { ActionsBar } from "@/app/dashboard_v2/[teamKey]/gas_abstraction/[dealId]/ActionsBar"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"
import { Update } from "./Update"

const Page = ({ params: { dealId } }: { params: { dealId: string } }) => {
  const { team, deals } = useRequiredContext(TeamContext)
  const deal = deals.find((d) => d.id === Number(dealId))

  return (
    <DealUpdateProvider dealId={Number(dealId)}>
      <Update>
        <section>
          <DealsTransactionsCharts title={deal?.name ?? "Deals"} />
        </section>

        <ActionsBar />

        <FiltersCard />
        <ControlCard />

        <Contact teamKey={team.team_key} />
      </Update>
    </DealUpdateProvider>
  )
}

export default Page
