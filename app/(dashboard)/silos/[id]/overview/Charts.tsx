import Heading from "@/components/Heading"
import TabCharts from "@/components/TabCharts"
import { getSiloById } from "@/mockApi"
import { notFound } from "next/navigation"

const Charts = async ({ siloId }: { siloId: string }) => {
  const silo = await getSiloById(siloId)

  if (!silo) notFound()

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
        <Heading tag="h2">{silo.name}</Heading>
      </TabCharts>
    </section>
  )
}

export default Charts
