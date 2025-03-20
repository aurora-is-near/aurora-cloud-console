"use client"

import Image from "next/image"
import { useContext } from "react"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import BridgePageConfigurationTab from "@/components/BridgePage/BridgePageConfigurationTab"
import { BridgePageAboutTab } from "@/components/BridgePage/BridgePageAboutTab"
import { UniversalWidgetOpenButton } from "@/components/UniversalWidgetOpenButton"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"
import { SiloContext } from "@/providers/SiloProvider"

export const BridgePage = () => {
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useContext(SiloContext) ?? {}
  const tabs = [{ title: "About", content: <BridgePageAboutTab /> }]

  if (silo) {
    tabs.push({
      title: "Configuration",
      content: (
        <BridgePageConfigurationTab
          siloId={silo.id}
          linkPrefix={`/dashboard/${team.team_key}/silos/${silo.id}/onramp`}
        />
      ),
    })
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
            src="/static/v2/images/feature/hero/bridge.png"
            alt="Bridge Preview"
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
