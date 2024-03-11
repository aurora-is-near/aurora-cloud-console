import Contact from "@/components/Contact"
import { SiloTransactionsCharts } from "./SiloTransactionsCharts"
import { DashboardPage } from "@/components/DashboardPage"
import { LatencyChart } from "../../LatencyChart"
import { RpcRequestsChart } from "../../RpcRequestsChart"
import { FailureRateChart } from "../../FailureRateChart"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <DashboardPage>
      <section>
        <SiloTransactionsCharts siloId={Number(id)} />
      </section>

      <section className="grid md:grid-cols-2 gap-y-5 gap-x-2.5">
        <LatencyChart id={id} />
        <RpcRequestsChart id={id} />
        <FailureRateChart id={id} />
      </section>

      <Contact text="Need help setting up a silo?" />
    </DashboardPage>
  )
}

export default Page
