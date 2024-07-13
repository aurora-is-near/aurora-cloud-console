import Contact from "@/components/Contact"
import { DealUpdateProvider } from "@/providers/DealUpdateProvider"
import { DealTransactionCharts } from "./DealTransactionsCharts"
import { FiltersCard } from "./FiltersCard"
import { DealUpdatePage } from "./DealUpdatePage"
import { ControlCard } from "./ControlCard"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return (
    <DealUpdateProvider dealId={Number(id)}>
      <DealUpdatePage>
        <section>
          <DealTransactionCharts />
        </section>

        <FiltersCard />
        <ControlCard />

        <Contact teamKey={teamKey} />
      </DealUpdatePage>
    </DealUpdateProvider>
  )
}

export default Page
