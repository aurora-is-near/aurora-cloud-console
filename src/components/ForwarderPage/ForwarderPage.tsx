import Image from "next/image"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { Silo, Team } from "@/types/types"
import { ForwarderWidgetOpenButton } from "@/components/ForwarderOpenButton"
import { WidgetEmbedCodeCard } from "@/components/EmbedCodeCard"
import { ForwarderAboutTab } from "./ForwarderAboutTab"
import ForwarderConfigurationTab from "./ForwarderConfigurationTab"

interface ForwarderPageProps {
  team: Team
  silo?: Silo | null
}

export const ForwarderPage: React.FC<ForwarderPageProps> = ({
  team,
  silo = null,
}) => {
  const tabs = [
    {
      title: "About",
      content: <ForwarderAboutTab />,
    },
  ]

  if (silo) {
    tabs.push(
      {
        title: "Configuration",
        content: <ForwarderConfigurationTab silo={silo} />,
      },
      {
        title: "Embed Code",
        content: (
          <WidgetEmbedCodeCard
            siloId={silo.id}
            teamKey={team.team_key}
            widgetName="forwarder"
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
              src="/static/v2/images/icons/marketplace/cex_withdrawals.svg"
              alt="Onramp Logo"
            />
            Forwarder
          </>
        }
        description="Allow users to deposit assets from centralized exchanges to your chain."
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/forwarder.png"
            alt="Forwarder Preview"
          />
        }
      >
        {silo && (
          <ForwarderWidgetOpenButton
            silo={silo}
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
