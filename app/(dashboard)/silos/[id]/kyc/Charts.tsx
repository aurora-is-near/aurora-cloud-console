import BreadcrumbHeading from "@/components/BreadcrumbHeading"
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
            title: "KYC",
            value: "2,778",
            chart: <></>,
            legend: ["Success", "Rejection"],
          },
          {
            title: "KYB",
            value: "1,201",
            chart: <></>,
            legend: ["Success", "Rejection"],
          },
        ]}
      >
        <BreadcrumbHeading titles={[silo.name, "KYC"]} />
      </TabCharts>
    </section>
  )
}

export default Charts
