import Contact from "@/components/Contact"
import Heading from "@/components/Heading"
import DealsList from "./DealsList"
import { DealsTransactionsCharts } from "@/app/dashboard/[teamKey]/borealis/deals/DealsTransactionsCharts"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeam } from "@/actions/teams/get-team"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeam(teamKey)

  return (
    <DashboardPage>
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        <section>
          <DealsTransactionsCharts />
        </section>

        <section>
          <Heading tag="h2" className="mb-4 sm:mb-5 md:mb-7">
            Deals
          </Heading>

          <DealsList team={team} />
        </section>

        <Contact />
      </div>
    </DashboardPage>
  )
}

export default Page
