import Chart from "../../Chart"
import Contact from "@/components/Contact"
import { Suspense } from "react"
import ChartsLoader from "@/components/ChartsLoader"
import Charts from "./Charts"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className="space-y-4 sm:space-y-5">
      <Suspense fallback={<ChartsLoader />}>
        <Charts siloId={id} />
      </Suspense>

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
