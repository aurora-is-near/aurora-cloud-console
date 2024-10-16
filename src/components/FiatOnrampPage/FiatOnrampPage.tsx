import Image from "next/image"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import FiatOnrampConfigurationTab from "./FiatOnrampConfigurationTab"
import { FiatOnrampAboutTab } from "./FiatOnrampAboutTab"

interface FiatOnrampPageProps {
  teamKey: string
  siloId?: number
}

export const FiatOnrampPage: React.FC<FiatOnrampPageProps> = ({
  teamKey,
  siloId,
}) => {
  const tabs = [
    {
      title: "About",
      content: <FiatOnrampAboutTab />,
    },
  ]

  if (siloId) {
    tabs.push({
      title: "Configuration",
      content: (
        <FiatOnrampConfigurationTab
          linkPrefix={`/dashboard/${teamKey}/silos/${siloId}/onramp`}
        />
      ),
    })
  }

  return (
    <DashboardPage>
      <Hero
        title="Fiat onramp"
        description="Enable your users to onramp from fiat to crypto directly on your chain."
        titlePrefix={
          <Image
            width="48"
            height="48"
            src="/static/v2/images/icons/marketplace/cex_withdrawals.svg"
            alt="Onramp Logo"
          />
        }
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/fiat_onramp.png"
            alt="Onramp Preview"
          />
        }
      />

      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
