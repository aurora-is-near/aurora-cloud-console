import { FeatureCTAList } from "@/components/FeatureCTAList"
import { FeatureCTA } from "@/components/FeatureCTA"
import OnrampHero from "./OnrampHero"

const OnrampHomePage = ({
  teamKey,
  siloId,
}: {
  teamKey: string
  siloId?: string
}) => {
  const isNewTeam = !!siloId

  return (
    <div className="divide-y flex flex-col gap-10">
      <OnrampHero />
      <div className="flex flex-col pt-10 gap-5">
        <span className="text-xl text-slate-900 font-bold">Solutions</span>

        <FeatureCTAList>
          <FeatureCTA
            title="Universal widget"
            description="Send, receive, bridge, pay and onramp on your virtual chain."
            icon="/static/v2/images/examples/universal_widget.png"
            link="#"
          />
          <FeatureCTA
            title="Fiat to crypto"
            description="Enable your users to onramp from fiat to crypto directly on your chain."
            icon="/static/v2/images/examples/fiat_to_crypto.png"
            link={`/dashboard/${teamKey}/${
              isNewTeam ? `silos/${siloId}/` : ""
            }onramp/fiat-to-crypto`}
          />
          <FeatureCTA
            title="CEX withdrawals"
            description="Allow users to deposit assets from centralized exchanges to your chain."
            icon="/static/v2/images/examples/cex_withdrawals.png"
            link="#"
          />
          <FeatureCTA
            title="Bridge"
            description="Bridge assets between Ethereum, NEAR and Aurora. "
            icon="/static/v2/images/examples/bridge.png"
            link="#"
          />
        </FeatureCTAList>
      </div>
    </div>
  )
}

export default OnrampHomePage
