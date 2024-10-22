import Image from "next/image"
import OracleAboutTab from "@/components/OraclePage/OracleAboutTab"
import { OracleDeploymentTab } from "@/components/OraclePage/OracleDeploymentTab"
import Hero from "@/components/Hero/Hero"
import OracleHeroAction from "@/components/OraclePage/OracleHeroAction"
import { Tabs } from "@/components/Tabs/Tabs"

const OraclePage = ({
  teamKey,
  siloId,
}: {
  teamKey: string
  siloId?: number
}) => {
  const tabs = [{ title: "About", content: <OracleAboutTab /> }]

  if (siloId) {
    tabs.push({
      title: "Deployment",
      content: <OracleDeploymentTab teamKey={teamKey} siloId={siloId} />,
    })
  }

  return (
    <div className="flex flex-col gap-10">
      <Hero
        title="Oracle"
        description="Secure your smart contracts with reliable, low-latency market data from institutional sources."
        actions={siloId ? <OracleHeroAction siloId={siloId} /> : null}
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
  )
}

export default OraclePage
