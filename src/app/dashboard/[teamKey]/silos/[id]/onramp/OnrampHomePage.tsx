import { FeatureCTAList } from "@/components/FeatureCTAList"
import { FeatureCTA } from "@/components/FeatureCTA"
import OnrampHero from "./OnrampHero"

const OnrampHomePage = () => {
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
            link="#"
          />
          <FeatureCTA
            title="CEX withdrawals"
            description="Allow users to deposit assets from centralized exchanges to your chain."
            icon="/static/v2/images/examples/cex_withdrawals.png"
            link="#"
          />
        </FeatureCTAList>
      </div>
    </div>
  )
}

export default OnrampHomePage
