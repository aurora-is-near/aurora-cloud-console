import Contact from "@/components/Contact"
import Heading from "@/components/Heading"
import DealsList from "./DealsList"
import { DealsTransactionsCharts } from "@/app/(dashboard)/borealis/deals/DealsTransactionsCharts"

const Page = () => {
  return (
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
  )
}

export default Page
