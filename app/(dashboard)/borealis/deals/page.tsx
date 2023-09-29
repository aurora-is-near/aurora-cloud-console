import { Suspense } from "react"
import Contact from "@/components/Contact"
import Heading from "@/components/Heading"
import DealsList from "./DealsList"
import TabCharts from "@/components/TabCharts"

const Page = () => {
  return (
    <div className="space-y-12">
      <section>
        <TabCharts
          tabs={[
            {
              title: "Transactions volume",
              value: "88,989",
              chart: <></>,
              legend: ["A very big deal", "Another deal"],
            },
            {
              title: "Total wallets",
              value: "12,832",
              chart: <></>,
              legend: ["A very big deal", "Another deal"],
            },
            {
              title: "Avg transactions per wallet",
              value: "1.34",
              chart: <></>,
              legend: ["A very big deal", "Another deal"],
            },
          ]}
        >
          <Heading tag="h2">Summary</Heading>
        </TabCharts>
      </section>

      <section>
        <Heading tag="h2" className="mb-7">
          Deals
        </Heading>

        <Suspense fallback={<div>Loading...</div>}>
          <DealsList />
        </Suspense>
      </section>

      <Contact />
    </div>
  )
}

export default Page
