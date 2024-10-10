import { FeatureCTAList } from "@/components/FeatureCTAList"
import { FeatureCTA } from "@/components/FeatureCTA"
import { DashboardPage } from "@/components/DashboardPage"
import { OnrampHomePageHero } from "@/components/OnrampHomePage/OnrampHomePageHero"
import { Silo } from "@/types/types"

type OnrampHomePageProps = {
  teamKey: string
  silo?: Silo | null
}

export const OnrampHomePage = ({ teamKey, silo }: OnrampHomePageProps) => {
  const siloPrefix = silo ? `/silos/${silo.id}` : ""
  const linkPrefix = `/dashboard/${teamKey}${siloPrefix}/onramp`

  return (
    <DashboardPage>
      <div className="divide-y flex flex-col gap-10">
        <OnrampHomePageHero />
        <div className="flex flex-col pt-10 gap-5">
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
              title="CEX withdrawals"
              description="Allow users to deposit assets from centralized exchanges to your chain."
              icon="/static/v2/images/examples/cex_withdrawals.png"
              link={`${linkPrefix}/cex-withdrawals`}
            />
          </FeatureCTAList>
        </div>
      </div>
    </DashboardPage>
  )
}
