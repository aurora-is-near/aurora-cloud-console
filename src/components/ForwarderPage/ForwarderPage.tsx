import Image from "next/image"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { ForwarderAboutTab } from "./ForwarderAboutTab"
import ForwarderConfigurationTab from "./ForwarderConfigurationTab"

interface ForwarderPageProps {
  teamKey: string
  siloId?: number
}

export const ForwarderPage: React.FC<ForwarderPageProps> = ({
  teamKey,
  siloId,
}) => {
  const tabs = [
    {
      title: "About",
      content: <ForwarderAboutTab />,
    },
  ]

  if (siloId) {
    tabs.push({
      title: "Configuration",
      content: (
        <ForwarderConfigurationTab
          siloId={siloId}
          linkPrefix={`/dashboard/${teamKey}/silos/${siloId}/onramp`}
        />
      ),
    })
  }

  return (
    <DashboardPage>
      <Hero
        title="Forwarder"
        description="Allow users to deposit assets from centralized exchanges to your chain."
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
            src="/static/v2/images/feature/hero/forwarder.png"
            alt="Forwarder Preview"
          />
        }
      />

      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
