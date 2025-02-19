import Image from "next/image"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import UniversalWidgetConfigurationTab from "@/components/UniversalWidgetPage/UniversalWidgetConfigurationTab"
import { UniversalWidgetOpenButton } from "@/components/UniversalWidgetOpenButton"
import { WidgetEmbedCodeCard } from "@/components/EmbedCodeCard"
import { UniversalWidgetAboutTab } from "./UniversalWidgetAboutTab"

interface UniversalWidgetPageProps {
  teamKey: string
  siloId?: number | null
}

export const UniversalWidgetPage: React.FC<UniversalWidgetPageProps> = ({
  teamKey,
  siloId = null,
}: UniversalWidgetPageProps) => {
  const tabs = [
    {
      title: "About",
      content: <UniversalWidgetAboutTab />,
    },
  ]

  if (siloId) {
    tabs.push(
      {
        title: "Configuration",
        content: <UniversalWidgetConfigurationTab siloId={siloId} />,
      },
      {
        title: "Embed Code",
        content: (
          <WidgetEmbedCodeCard
            siloId={siloId}
            teamKey={teamKey}
            widgetName="universal"
          />
        ),
      },
    )
  }

  return (
    <DashboardPage>
      <Hero
        title={
          <>
            <Image
              width="48"
              height="48"
              src="/static/v2/images/icons/marketplace/universal-widget.svg"
              alt="Universal Widget Logo"
            />
            Universal Widget
          </>
        }
        description="Send, receive, bridge, pay and onramp on Aurora virtual chains, NEAR and Ethereum."
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/universal_widget.png"
            alt="Universal Widget Preview"
          />
        }
      >
        {!!siloId && (
          <UniversalWidgetOpenButton
            siloId={siloId}
            variant="border"
            size="lg"
            isExternal
          />
        )}
      </Hero>
      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
