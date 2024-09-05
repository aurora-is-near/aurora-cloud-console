import { getDeal } from "@/actions/deals/get-deal"
import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { DealsTransactionsCharts } from "@/app/dashboard_v2/[teamKey]/monitoring/DealsTransactionsChart"
import { FiltersCard } from "@/app/dashboard/[teamKey]/borealis/deals/[id]/FiltersCard"
import { ControlCard } from "@/app/dashboard/[teamKey]/borealis/deals/[id]/ControlCard"
import Layout from "@/app/dashboard_v2/Layout"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { ActionsBar } from "@/app/dashboard_v2/[teamKey]/gas_abstraction/[dealId]/ActionsBar"
import { Update } from "./Update"

const Page = async ({
  params: { dealId, teamKey },
}: {
  params: { dealId: string; teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const deal = await getDeal(Number(dealId))

  return (
    <DealUpdateProvider dealId={Number(dealId)}>
      <Layout team={team}>
        <Update>
          <section>
            <DealsTransactionsCharts title={deal?.name ?? "Deals"} />
          </section>

          <ActionsBar />

          <FiltersCard />
          <ControlCard />

          <Contact teamKey={teamKey} />
        </Update>
      </Layout>
    </DealUpdateProvider>
  )
}

export default Page
