import Contact from "@/components/Contact"
import { DealTransactionCharts } from "./DealTransactionsCharts"
import { FiltersCard } from "./FiltersCard"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { DealUpdatePage } from "./DealUpdatePage"
import { ControlCard } from "./ControlCard"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DealUpdateProvider dealId={Number(id)}>
      <DealUpdatePage>
        <section>
          <DealTransactionCharts />
        </section>

        <FiltersCard />
        <ControlCard />

        <Contact />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
