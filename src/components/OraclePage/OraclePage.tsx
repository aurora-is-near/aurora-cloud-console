import Image from "next/image"
import { OracleAboutTab } from "@/components/OraclePage/OracleAboutTab"
import { OracleDeploymentTab } from "@/components/OraclePage/OracleDeploymentTab"
import Hero from "@/components/Hero/Hero"
import { Tabs } from "@/components/Tabs/Tabs"
import { DashboardPage } from "@/components/DashboardPage"
import { OracleRequestDeploymentButton } from "@/components/OraclePage/OracleRequestDeploymentButton"
import { AuroraOracle } from "@/types/oracle"

const OraclePage = ({
  teamKey,
  siloId,
  oracle,
}: {
  teamKey: string
  siloId?: number
  oracle?: AuroraOracle | null
}) => {
  const tabs = [{ title: "About", content: <OracleAboutTab /> }]

  if (oracle) {
    tabs.push({
      title: "Deployment",
      content: <OracleDeploymentTab teamKey={teamKey} oracle={oracle} />,
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

export default OraclePage
