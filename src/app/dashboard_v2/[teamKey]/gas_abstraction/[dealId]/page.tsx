import { getDeal } from "@/actions/deals/get-deal"
import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { DealsTransactionsCharts } from "@/app/dashboard_v2/[teamKey]/monitoring/DealsTransactionsChart"
import { FiltersCard } from "@/app/dashboard/[teamKey]/borealis/deals/[id]/FiltersCard"
import { ControlCard } from "@/app/dashboard/[teamKey]/borealis/deals/[id]/ControlCard"
import Layout from "@/app/dashboard_v2/Layout"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { Update } from "./Update"

const Page = async ({
  params: { dealId, teamKey },
}: {
  params: { dealId: string; teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const deal = await getDeal(Number(dealId))

  return (
    <Layout team={team}>
      <DealUpdateProvider dealId={Number(dealId)}>
        <Update>
          <section>
            <DealsTransactionsCharts title={deal?.name ?? "Deals"} />
          </section>

          <FiltersCard />
          <ControlCard />

          <Contact teamKey={teamKey} />
        </Update>
      </DealUpdateProvider>
    </Layout>
  )
}

export default Page
