import React from "react"
import Image from "next/image"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { TabCard } from "@/components/TabCard/TabCard"
import BridgePageConfigurationTab from "@/components/BridgePage/BridgePageConfigurationTab"

interface BridgePageProps {
  teamKey?: string
  siloId?: number
}

const aboutTab = {
  title: "About",
  content: (
    <TabCard
      attribution={{
        text: "Powered by Munzen",
      }}
    >
      <div className="flex flex-col gap-2 text-slate-500">
        <p>
          You can enable fiat onramp on your chain to let users purchase crypto
          assets with their credit card. Some assets are supported by default
          such as USDT, USDC, AURORA, NEAR, ETH.
        </p>
        <p>
          To enable the purchase of your own asset, please get in touch with
          your account manager.
        </p>
      </div>
    </TabCard>
  ),
}

const BridgePageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
      {children}
    </DashboardPage>
  )
}

const BridgePageContent: React.FC<{ teamKey: string; siloId: number }> = ({
  teamKey,
  siloId,
}) => {
  return (
    <Tabs
      tabs={[
        aboutTab,
        {
          title: "Configuration",
          content: (
            <BridgePageConfigurationTab
              linkPrefix={`/dashboard/${teamKey}/silos/${siloId}/onramp`}
            />
          ),
        },
      ]}
    />
  )
}

export const BridgePage: React.FC<BridgePageProps> = ({ teamKey, siloId }) => {
  if (!teamKey || !siloId) {
    return (
      <BridgePageLayout>
        <Tabs tabs={[aboutTab]} />
      </BridgePageLayout>
    )
  }

  const siloIdNumber = Number(siloId)

  return (
    <BridgePageLayout>
      <BridgePageContent teamKey={teamKey} siloId={siloIdNumber} />
    </BridgePageLayout>
  )
}
