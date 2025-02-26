import Image from "next/image"

import Hero from "@/components/Hero/Hero"
import { Tabs } from "@/components/Tabs/Tabs"
import { DashboardPage } from "@/components/DashboardPage"
import { AuroraOracle } from "@/types/oracle"
import { AuroraOracleToken } from "@/types/aurora-oracle-api"
import { NotAvailableBadge } from "@/components/NotAvailableBadge"

import { OracleConfigurationTab } from "./OracleConfigurationTab"
import { OracleRequestDeploymentButton } from "./OracleRequestDeploymentButton"
import { OracleDeploymentTab } from "./OracleDeploymentTab"
import { OracleAboutTab } from "./OracleAboutTab"

type OraclePageProps = {
  teamKey: string
  siloId?: number
  oracle?: AuroraOracle | null
  tokens?: AuroraOracleToken[]
}

const OraclePage = ({ teamKey, siloId, oracle, tokens }: OraclePageProps) => {
  const tabs = [{ title: "About", content: <OracleAboutTab /> }]

  if (oracle) {
    tabs.push(
      {
        title: "Configuration",
        content: <OracleConfigurationTab teamKey={teamKey} tokens={tokens} />,
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
          title="Oracle"
          description="Secure your smart contracts with reliable, low-latency market data from institutional sources."
          actions={
            <>
              {!siloId && (
                <NotAvailableBadge>
                  Available with your Virtual Chain
                </NotAvailableBadge>
              )}

              {!!siloId && !oracle && (
                <OracleRequestDeploymentButton siloId={siloId} />
              )}
            </>
          }
          titlePrefix={
            <Image
              width="48"
              height="48"
              src="/static/v2/images/icons/marketplace/oracle.svg"
              alt="Oracle Logo"
            />
          }
          image={
            <Image
              width="400"
              height="240"
              src="/static/v2/images/feature/hero/oracle.png"
              alt="Oracle Preview"
            />
          }
        />

        <Tabs tabs={tabs} />
      </div>
    </DashboardPage>
  )
}

export default OraclePage
