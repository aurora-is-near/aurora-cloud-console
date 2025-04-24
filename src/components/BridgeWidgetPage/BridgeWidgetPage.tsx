"use client"

import Image from "next/image"
import { useCallback, useContext, useRef } from "react"
import { Tabs, TabsFunctions } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { WidgetEmbedCodeCard } from "@/components/WidgetEmbedCodeCard"
import { WidgetShareCard } from "@/components/WidgetShareCard"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"
import { SiloContext } from "@/providers/SiloProvider"
import { BridgeWidgetOpenButton } from "@/components//BridgeWidgetOpenButton"
import { Button } from "@/components/Button"
import { BridgeWidgetAboutTab } from "./BridgeWidgetAboutTab"
import { BridgeWidgetConfigurationTab } from "./BridgeWidgetConfigurationTab"

export const BridgeWidgetPage = () => {
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useContext(SiloContext) ?? {}
  const tabsRef = useRef<TabsFunctions>(null)

  const onConfigureClick = useCallback(() => {
    tabsRef.current?.setActiveTabIndex(1)
  }, [])

  const tabs = [
    {
      title: "About",
      content: <BridgeWidgetAboutTab />,
    },
  ]

  if (silo) {
    tabs.push(
      {
        title: "Configuration",
        content: <BridgeWidgetConfigurationTab siloId={silo.id} />,
      },
      {
        title: "Embed Code",
        content: (
          <WidgetEmbedCodeCard
            siloId={silo.id}
            teamKey={team.team_key}
            widgetName="bridge"
          />
        ),
      },
      {
        title: "Shareable URL",
        content: (
          <WidgetShareCard
            siloId={silo.id}
            teamKey={team.team_key}
            widgetName="bridge"
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
              src="/static/v2/images/icons/marketplace/bridge.svg"
              alt="Bridge Logo"
            />
            Bridge
          </>
        }
        description="Bridge assets between Ethereum, NEAR and Aurora. Configure your bridge widget and embed it."
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/bridge_widget.png"
            alt="Bridge Preview"
          />
        }
      >
        {!!silo && (
          <div className="space-x-3 flex flex-row">
            <Button variant="primary" size="lg" onClick={onConfigureClick}>
              Configure
            </Button>
            <BridgeWidgetOpenButton
              siloId={silo.id}
              variant="border"
              size="lg"
              isExternal
            />
          </div>
        )}
      </Hero>
      <Tabs ref={tabsRef} tabs={tabs} />
    </DashboardPage>
  )
}
