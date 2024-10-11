import Image from "next/image"
import { DashboardPage } from "@/components/DashboardPage"
import Hero from "@/components/Hero/Hero"
import { Tabs } from "@/components/Tabs/Tabs"
import { OracleRequestDeploymentButton } from "@/components/OraclePage/OracleRequestDeploymentButton"
import { AuroraOracle } from "@/types/oracle"
import { OracleDeploymentTab } from "./OracleDeploymentTab"
import { OracleAboutTab } from "./OracleAboutTab"

type OraclePageProps = {
  siloId?: number
  oracle?: AuroraOracle | null
  teamKey: string
}

export const OraclePage = ({ siloId, oracle, teamKey }: OraclePageProps) => {
  const tabs = [{ title: "About", content: <OracleAboutTab /> }]

  if (oracle) {
    tabs.push({
      title: "Deployment",
      content: <OracleDeploymentTab oracle={oracle} teamKey={teamKey} />,
    })
  }

  return (
    <DashboardPage>
      <div className="flex flex-col gap-10">
        <Hero
          title="Oracle"
          description="Secure your smart contracts with reliable, low-latency market data from institutional sources."
          actions={
            siloId &&
            !oracle && <OracleRequestDeploymentButton siloId={siloId} />
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
