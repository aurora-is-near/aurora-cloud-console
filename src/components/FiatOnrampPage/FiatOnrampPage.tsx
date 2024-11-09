import Image from "next/image"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { MunzenWidgetOpenButton } from "@/components/MunzenWidgetOpenButton"
import { Silo } from "@/types/types"
import FiatOnrampConfigurationTab from "./FiatOnrampConfigurationTab"
import { FiatOnrampAboutTab } from "./FiatOnrampAboutTab"

interface FiatOnrampPageProps {
  teamKey: string
  silo?: Silo | null
}

export const FiatOnrampPage: React.FC<FiatOnrampPageProps> = ({
  teamKey,
  silo = null,
}) => {
  const tabs = [
    {
      title: "About",
      content: <FiatOnrampAboutTab />,
    },
  ]

  if (silo) {
    tabs.push({
      title: "Configuration",
      content: (
        <FiatOnrampConfigurationTab
          siloId={silo.id}
          linkPrefix={`/dashboard/${teamKey}/silos/${silo.id}/onramp`}
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
        actions={silo && <MunzenWidgetOpenButton silo={silo} size="lg" />}
      />

      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
