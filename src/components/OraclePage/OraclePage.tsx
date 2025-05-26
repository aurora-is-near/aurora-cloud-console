"use client"

import Image from "next/image"
import { useContext } from "react"
import { useQueries } from "@tanstack/react-query"
import Hero from "@/components/Hero/Hero"
import { Tabs } from "@/components/Tabs/Tabs"
import { DashboardPage } from "@/components/DashboardPage"
import { NotAvailableBadge } from "@/components/NotAvailableBadge"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"
import { SiloContext } from "@/providers/SiloProvider"
import { auroraOracleApiClient } from "@/utils/aurora-oracle-api/client"
import { getSiloOracle } from "@/actions/silo-oracle/get-silo-oracle"
import { queryKeys } from "@/actions/query-keys"
import { OracleConfigurationTab } from "./OracleConfigurationTab"
import { OracleRequestDeploymentButton } from "./OracleRequestDeploymentButton"
import { OracleDeploymentTab } from "./OracleDeploymentTab"
import { OracleAboutTab } from "./OracleAboutTab"

const OraclePage = () => {
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useContext(SiloContext) ?? {}
  const tabs = [{ title: "About", content: <OracleAboutTab /> }]

  const [{ data: oracle }, { data: tokens }] = useQueries({
    queries: [
      {
        queryKey: queryKeys.getSiloOracle(silo?.id ?? null),
        queryFn: () => (silo ? getSiloOracle(silo.id) : null),
      },
      {
        queryKey: ["oracle-tokens"],
        queryFn: () => auroraOracleApiClient.getTokens(),
      },
    ],
  })

  if (oracle) {
    tabs.push(
      {
        title: "Configuration",
        content: (
          <OracleConfigurationTab
            teamKey={team.team_key}
            tokens={tokens?.items}
          />
        ),
      },
      {
        title: "Deployment",
        content: <OracleDeploymentTab oracle={oracle} />,
      },
    )
  }

  return (
    <DashboardPage>
      <div className="flex flex-col gap-10">
        <Hero
          title={
            <>
              <Image
                width="48"
                height="48"
                src="/static/image/icons/marketplace/oracle.svg"
                alt="Oracle Logo"
              />
              Oracle
            </>
          }
          description="Secure your smart contracts with reliable, low-latency market data from institutional sources."
          image={
            <Image
              width="400"
              height="240"
              src="/static/image/feature/hero/oracle.png"
              alt="Oracle Preview"
            />
          }
        >
          {!silo && (
            <NotAvailableBadge>
              Available with your Virtual Chain
            </NotAvailableBadge>
          )}

          {!!silo && !oracle && (
            <OracleRequestDeploymentButton team={team} silo={silo} />
          )}
        </Hero>

        <Tabs tabs={tabs} />
      </div>
    </DashboardPage>
  )
}

export default OraclePage
