import Image from "next/image"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { Silo } from "@/types/types"
import { ForwarderWidgetOpenButton } from "@/components/ForwarderOpenButton"
import { LinkButton } from "@/components/LinkButton"
import { WidgetEmbedCodeCard } from "@/components/WidgetEmbedCodeCard"
import { WidgetShareCard } from "@/components/WidgetShareCard"
import { ForwarderAboutTab } from "./ForwarderAboutTab"
import ForwarderConfigurationTab from "./ForwarderConfigurationTab"

interface ForwarderPageProps {
  teamKey: string
  silo?: Silo | null
}

export const ForwarderPage: React.FC<ForwarderPageProps> = ({
  teamKey,
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
            teamKey={teamKey}
            widgetName="forwarder"
          />
        ),
      },
      {
        title: "Shareable URL",
        content: (
          <WidgetShareCard
            siloId={silo.id}
            teamKey={teamKey}
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
        <div className="flex flex-row gap-4">
          {silo && (
            <ForwarderWidgetOpenButton silo={silo} size="lg" isExternal />
          )}
          <LinkButton variant="border" href="/api" size="lg" isExternal>
            <div className="flex flex-row items-center gap-1">
              View API
              <ArrowTopRightOnSquareIcon className="ml-2.5 w-6 h-6" />
            </div>
          </LinkButton>
        </div>
      </Hero>

      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
