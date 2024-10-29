import React from "react"
import Image from "next/image"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import BridgePageConfigurationTab from "@/components/BridgePage/BridgePageConfigurationTab"
import { BridgePageAboutTab } from "@/components/BridgePage/BridgePageAboutTab"

interface BridgePageProps {
  teamKey: string
  siloId?: number
}

export const BridgePage: React.FC<BridgePageProps> = ({ teamKey, siloId }) => {
  const tabs = [{ title: "About", content: <BridgePageAboutTab /> }]

  if (siloId) {
    tabs.push({
      title: "Configuration",
      content: (
        <BridgePageConfigurationTab
          siloId={siloId}
          linkPrefix={`/dashboard/${teamKey}/silos/${siloId}/onramp`}
        />
      ),
    })
  }

  return (
    <DashboardPage>
      <Hero
        title="Bridge"
        description="Bridge assets between Ethereum, NEAR and Aurora. Configure your bridge widget and embed it."
        titlePrefix={
          <Image
            width="48"
            height="48"
            src="/static/v2/images/icons/marketplace/bridge.svg"
            alt="Bridge Logo"
          />
        }
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/bridge.png"
            alt="Bridge Preview"
          />
        }
      />
      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
