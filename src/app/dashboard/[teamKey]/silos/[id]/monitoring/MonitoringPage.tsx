"use client"

import { useContext } from "react"
import { notFound } from "next/navigation"
import { DashboardPage } from "@/components/DashboardPage"
import { SiloContext } from "@/providers/SiloProvider"
import { SiloTransactionsCharts } from "./SiloTransactionsCharts"
import { LatencyChart } from "../../LatencyChart"
import { RpcRequestsChart } from "../../RpcRequestsChart"
import { FailureRateChart } from "../../FailureRateChart"

export const MonitoringPage = () => {
  const { silo } = useContext(SiloContext) ?? {}

  if (!silo) {
    notFound()
  }

  return (
    <DashboardPage>
      <section>
        <SiloTransactionsCharts siloId={silo.id} />
      </section>

      {!!silo.grafana_network_key && (
        <section className="grid md:grid-cols-2 gap-y-5 gap-x-2.5">
          <LatencyChart id={silo.id} />
          <RpcRequestsChart id={silo.id} />
          <FailureRateChart id={silo.id} />
        </section>
      )}
    </DashboardPage>
  )
}
