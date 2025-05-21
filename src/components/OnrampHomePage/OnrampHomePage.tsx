"use client"

import { useContext } from "react"
import { FeatureCTAList } from "@/components/FeatureCTAList"
import { FeatureCTA } from "@/components/FeatureCTA"
import { DashboardPage } from "@/components/DashboardPage"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"
import { SiloContext } from "@/providers/SiloProvider"
import { OnrampHomePageHero } from "./OnrampHomePageHero"

export const OnrampHomePage = () => {
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useContext(SiloContext) ?? {}

  const siloPrefix = silo ? `/silos/${silo.id}` : ""
  const linkPrefix = `/dashboard/${team.team_key}${siloPrefix}/onramp`

  return (
    <DashboardPage>
      <OnrampHomePageHero silo={silo} />
      <div className="flex flex-col gap-5">
        <span className="text-xl text-slate-900 font-bold">Solutions</span>

        <FeatureCTAList>
          <FeatureCTA
            title="Bridge"
            description="Bridge assets between Ethereum, Near, Aurora and your chain. Configure your bridge widget and embed it."
            icon="/static/images/examples/bridge_widget.png"
            link={`${linkPrefix}/bridge`}
          />
          <FeatureCTA
            title="Fiat to crypto"
            description="Enable your users to onramp from fiat to crypto directly on your chain."
            icon="/static/images/examples/fiat_to_crypto.png"
            link={`${linkPrefix}/fiat-to-crypto`}
          />
          <FeatureCTA
            title="Forwarder"
            description="Allow users to deposit assets from centralized exchanges to your chain."
            icon="/static/images/examples/cex_withdrawals.png"
            link={`${linkPrefix}/forwarder`}
          />
        </FeatureCTAList>
      </div>
    </DashboardPage>
  )
}
