"use client"

import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { DealsTransactionsCharts } from "@/app/dashboard_v2/[teamKey]/monitoring/DealsTransactionsChart"
import { FiltersCard } from "@/app/dashboard/[teamKey]/borealis/deals/[id]/FiltersCard"
import { ControlCard } from "@/app/dashboard/[teamKey]/borealis/deals/[id]/ControlCard"
import { ActionsBar } from "@/app/dashboard_v2/[teamKey]/gas_abstraction/[dealId]/ActionsBar"
import { useTeamContext } from "@/contexts/TeamContext"
import { Update } from "./Update"

const Page = ({ params: { dealId } }: { params: { dealId: string } }) => {
  const { deals, team } = useTeamContext()
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
