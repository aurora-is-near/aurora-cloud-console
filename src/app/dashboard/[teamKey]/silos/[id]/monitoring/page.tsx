"use client"

import { notFound } from "next/navigation"
import { useSuspenseQueries } from "@tanstack/react-query"
import { Suspense } from "react"
import { DashboardPage } from "@/components/DashboardPage"
import { queries } from "@/actions/queries"
import { Spinner } from "@/components/Spinner"
import { SiloTransactionsCharts } from "./SiloTransactionsCharts"
import { LatencyChart } from "../../LatencyChart"
import { RpcRequestsChart } from "../../RpcRequestsChart"
import { FailureRateChart } from "../../FailureRateChart"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const [{ data: silo }] = useSuspenseQueries({
    queries: [queries.getTeamSiloByKey(teamKey, Number(id))],
  })

  if (!silo) {
    notFound()
  }

  return (
    <Suspense fallback={<Spinner size="lg" />}>
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
      </DashboardPage>
    </Suspense>
  )
}

export default Page
