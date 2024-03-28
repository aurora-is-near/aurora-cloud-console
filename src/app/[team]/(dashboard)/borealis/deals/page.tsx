import Contact from "@/components/Contact"
import Heading from "@/components/Heading"
import DealsList from "./DealsList"
import { DealsTransactionsCharts } from "@/app/[team]/(dashboard)/borealis/deals/DealsTransactionsCharts"
import { DashboardPage } from "@/components/DashboardPage"

const Page = () => {
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

          <DealsList />
        </section>

        <Contact />
      </div>
    </DashboardPage>
  )
}

export default Page
