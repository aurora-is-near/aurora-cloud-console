import Image from "next/image"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { EmbedCodeCard } from "@/components/UniversalWidgetPage/EmbedCodeCard"
import UniversalWidgetConfigurationTab from "@/components/UniversalWidgetPage/UniversalWidgetConfigurationTab"
import { UniversalWidgetOpenButton } from "@/components/UniversalWidgetOpenButton"

interface UniversalWidgetPageProps {
  teamKey: string
  siloId?: number | null
}

export const UniversalWidgetPage: React.FC<UniversalWidgetPageProps> = ({
  teamKey,
  siloId = null,
}: UniversalWidgetPageProps) => {
  const tabs = []

  if (siloId) {
    tabs.push(
      {
        title: "Configuration",
        content: <UniversalWidgetConfigurationTab siloId={siloId} />,
      },
      {
        title: "Embed Code",
        content: <EmbedCodeCard siloId={siloId} teamKey={teamKey} />,
      },
    )
  }

  return (
    <DashboardPage>
      <Hero
        title="Universal Widget"
        description="Send, receive, bridge, pay and onramp on Aurora virtual chains, NEAR and Ethereum."
        titlePrefix={
          <Image
            width="48"
            height="48"
            src="/static/v2/images/icons/marketplace/universal-widget.svg"
            alt="Universal Widget Logo"
          />
        }
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/universal_widget.png"
            alt="Universal Widget Preview"
          />
        }
        actions={
          siloId && (
            <UniversalWidgetOpenButton
              siloId={siloId}
              variant="border"
              size="lg"
              isExternal
            />
          )
        }
      />
      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
