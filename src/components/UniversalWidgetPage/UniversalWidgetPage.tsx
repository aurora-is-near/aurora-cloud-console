"use client"

import Image from "next/image"
import { useContext } from "react"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import UniversalWidgetConfigurationTab from "@/components/UniversalWidgetPage/UniversalWidgetConfigurationTab"
import { UniversalWidgetOpenButton } from "@/components/UniversalWidgetOpenButton"
import { WidgetEmbedCodeCard } from "@/components/WidgetEmbedCodeCard"
import { WidgetShareCard } from "@/components/WidgetShareCard"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"
import { SiloContext } from "@/providers/SiloProvider"
import { UniversalWidgetAboutTab } from "./UniversalWidgetAboutTab"

export const UniversalWidgetPage = () => {
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useContext(SiloContext) ?? {}

  const tabs = [
    {
      title: "About",
      content: <UniversalWidgetAboutTab />,
    },
  ]

  if (silo) {
    tabs.push(
      {
        title: "Configuration",
        content: <UniversalWidgetConfigurationTab siloId={silo.id} />,
      },
      {
        title: "Embed Code",
        content: (
          <WidgetEmbedCodeCard
            siloId={silo.id}
            teamKey={team.team_key}
            widgetName="universal"
          />
        ),
      },
      {
        title: "Shareable URL",
        content: (
          <WidgetShareCard
            siloId={silo.id}
            teamKey={team.team_key}
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
        {!!silo && (
          <UniversalWidgetOpenButton
            siloId={silo.id}
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
