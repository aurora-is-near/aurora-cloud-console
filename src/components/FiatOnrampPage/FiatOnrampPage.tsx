"use client"

import Image from "next/image"
import { useContext } from "react"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { MunzenWidgetOpenButton } from "@/components/MunzenWidgetOpenButton"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"
import { SiloContext } from "@/providers/SiloProvider"
import { FiatOnrampAboutTab } from "./FiatOnrampAboutTab"
import FiatOnrampConfigurationTab from "./FiatOnrampConfigurationTab"

export const FiatOnrampPage = () => {
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useContext(SiloContext) ?? {}

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
              src="/static/images/icons/marketplace/cex_withdrawals.svg"
              alt="Onramp Logo"
            />
            Fiat onramp
          </>
        }
        description="Enable your users to onramp from fiat to crypto directly on your chain."
        image={
          <Image
            width="400"
            height="240"
            src="/static/images/feature/hero/fiat_onramp.png"
            alt="Onramp Preview"
          />
        }
      >
        {silo && <MunzenWidgetOpenButton silo={silo} size="lg" />}
      </Hero>

      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
