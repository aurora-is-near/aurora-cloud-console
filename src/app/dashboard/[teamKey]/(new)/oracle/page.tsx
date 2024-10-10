import Image from "next/image"
import { DashboardPage } from "@/components/DashboardPage"
import Hero from "@/components/Hero/Hero"
import AboutTab from "@/components/OraclePage/AboutTab"
import { Tabs } from "@/components/Tabs/Tabs"

const Page = () => {
  const tabs = [{ title: "About", content: <AboutTab /> }]

  return (
    <DashboardPage>
      <div className="flex flex-col gap-10">
        <Hero
          title="Oracle"
          description="Secure your smart contracts with reliable, low-latency market data from institutional sources."
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

export default Page
