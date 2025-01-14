import { FeatureCTAList } from "@/components/FeatureCTAList"
import { FeatureCTA } from "@/components/FeatureCTA"
import { DashboardPage } from "@/components/DashboardPage"
import { Silo } from "@/types/types"
import { OnrampHomePageHero } from "./OnrampHomePageHero"

type OnrampHomePageProps = {
  teamKey: string
  silo?: Silo | null
}

export const OnrampHomePage = ({
  teamKey,
  silo,
}: OnrampHomePageProps) => {
  const siloPrefix = silo ? `/silos/${silo.id}` : ""
  const linkPrefix = `/dashboard/${teamKey}${siloPrefix}/onramp`

  return (
    <DashboardPage>
      <OnrampHomePageHero silo={silo} />
      <div className="flex flex-col gap-5">
        <span className="text-xl text-slate-900 font-bold">Solutions</span>

        <FeatureCTAList>
          <FeatureCTA
            title="Universal widget"
            description="Send, receive, bridge, pay and onramp on your virtual chain."
            icon="/static/v2/images/examples/universal_widget.png"
            link={`${linkPrefix}/universal-widget`}
          />
          <FeatureCTA
            title="Fiat to crypto"
            description="Enable your users to onramp from fiat to crypto directly on your chain."
            icon="/static/v2/images/examples/fiat_to_crypto.png"
            link={`${linkPrefix}/fiat-to-crypto`}
          />
          <FeatureCTA
            title="Bridge"
            description="Bridge assets between Ethereum, NEAR and Aurora."
            icon="/static/v2/images/examples/bridge.png"
            link={`${linkPrefix}/bridge`}
          />
        </FeatureCTAList>
      </div>
    </DashboardPage>
  )
}
