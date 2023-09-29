import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import TabCharts from "@/components/TabCharts"
import { getSiloById } from "@/mockApi"
import { notFound } from "next/navigation"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const silo = await getSiloById(id)

  if (!silo) notFound()

  return (
    <div className="space-y-5">
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
    </div>
  )
}

export default Page
