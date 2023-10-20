import TabCharts from "@/components/TabCharts"
import { getDealById } from "@/mockApi"
import { notFound } from "next/navigation"
import ToggleDeal from "../ToggleDeal"
import Heading from "@/components/Heading"

const Charts = async ({ dealId }: { dealId: string }) => {
  const deal = await getDealById(dealId)

  if (!deal) notFound()

  return (
    <section>
      <TabCharts
        tabs={[
          {
            title: "Transactions volume",
            value: "24,083",
            chart: <></>,
            legend: ["A very big deal", "Another deal"],
          },
          {
            title: "Total wallets",
            value: "3,932",
            chart: <></>,
            legend: ["A very big deal", "Another deal"],
          },
          {
            title: "Avg transactions per wallet",
            value: "1.03",
            chart: <></>,
            legend: ["A very big deal", "Another deal"],
          },
        ]}
      >
        <div className="flex items-center space-x-4">
          <ToggleDeal dealId={dealId} />
          <Heading tag="h2">{deal.name}</Heading>
        </div>
      </TabCharts>
    </section>
  )
}

export default Charts
