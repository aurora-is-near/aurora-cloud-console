import Contact from "@/components/Contact"
import { SiloTransactionsCharts } from "./SiloTransactionsCharts"
import { DashboardPage } from "@/components/DashboardPage"
import { LatencyChart } from "../../LatencyChart"
import { RpcRequestsChart } from "../../RpcRequestsChart"
import { FailureRateChart } from "../../FailureRateChart"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { notFound } from "next/navigation"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const silo = await getTeamSiloByKey(teamKey, Number(id))

  if (!silo) {
    notFound()
  }

  return (
    <DashboardPage>
      <section>
        <SiloTransactionsCharts siloId={Number(id)} />
      </section>

      {!!silo.grafana_network_key && (
        <section className="grid md:grid-cols-2 gap-y-5 gap-x-2.5">
          <LatencyChart id={id} />
          <RpcRequestsChart id={id} />
          <FailureRateChart id={id} />
        </section>
      )}

      <Contact teamKey={teamKey} text="Need help setting up a silo?" />
    </DashboardPage>
  )
}

export default Page
