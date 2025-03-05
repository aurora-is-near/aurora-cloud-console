import Image from "next/image"

import Hero from "@/components/Hero/Hero"
import { Tabs } from "@/components/Tabs/Tabs"
import { DashboardPage } from "@/components/DashboardPage"
import { AuroraOracle } from "@/types/oracle"
import { AuroraOracleToken } from "@/types/aurora-oracle-api"
import { NotAvailableBadge } from "@/components/NotAvailableBadge"

import { Silo, Team } from "@/types/types"
import { OracleConfigurationTab } from "./OracleConfigurationTab"
import { OracleRequestDeploymentButton } from "./OracleRequestDeploymentButton"
import { OracleDeploymentTab } from "./OracleDeploymentTab"
import { OracleAboutTab } from "./OracleAboutTab"

type OraclePageProps = {
  team: Team
  silo?: Silo | null
  oracle?: AuroraOracle | null
  tokens?: AuroraOracleToken[]
}

const OraclePage = ({ team, silo, oracle, tokens }: OraclePageProps) => {
  const tabs = [{ title: "About", content: <OracleAboutTab /> }]

  if (oracle) {
    tabs.push(
      {
        title: "Configuration",
        content: (
          <OracleConfigurationTab teamKey={team.team_key} tokens={tokens} />
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
                src="/static/v2/images/icons/marketplace/oracle.svg"
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
              src="/static/v2/images/feature/hero/oracle.png"
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
