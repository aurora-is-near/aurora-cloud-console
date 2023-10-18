import TabCharts from "@/components/TabCharts"
import Heading from "@/components/Heading"
import { getSiloById } from "@/mockApi"
import { notFound } from "next/navigation"
import Chart from "../../Chart"
import Contact from "@/components/Contact"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const silo = await getSiloById(id)

  if (!silo) notFound()

  return (
    <div className="space-y-4 sm:space-y-5">
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

      <section className="grid md:grid-cols-2 gap-y-5 gap-x-2.5">
        <Chart
          title="Latency"
          subtitle="Last 24 hours"
          className="md:col-span-2"
          legend={["10%", "25%", "50%", "100%"]}
        />
        <Chart title="RPC Requests" />
        <Chart title="Failure rate" />
      </section>

      <Contact text="Need help setting up a silo?" />
    </div>
  )
}

export default Page
