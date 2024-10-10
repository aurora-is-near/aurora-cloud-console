import Image from "next/image"
import Card from "@/components/Card"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"

const FiatOnrampPage = () => {
  return (
    <>
      <Hero
        title="Fiat onramp"
        description="Enable your users to onramp from fiat to crypto directly on your chain."
        titlePrefix={
          <Image
            width="48"
            height="48"
            src="/static/v2/images/icons/marketplace/cex_withdrawals.svg"
            alt="Onramp Logo"
          />
        }
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/fiat_onramp.png"
            alt="Onramp Preview"
          />
        }
      />

      <Tabs
        tabs={[
          {
            title: "About",
            content: (
              <Card className="divide-y flex flex-col gap-5">
                <div className="flex flex-col gap-2 text-slate-500">
                  <p>
                    You can enable fiat onramp on your chain to let users
                    purchase crypto assets with their credit card. Some assets
                    are supported by default such as USDT, USDC, AURORA, NEAR,
                    ETH.
                  </p>
                  <p>
                    To enable the purchase of your own asset, please get in
                    touch with your account manager.
                  </p>
                </div>
                <div className="pt-5 flex flex-row items-center gap-3">
                  <span className="text-sm text-slate-600">
                    Powered by Munzen
                  </span>
                </div>
              </Card>
            ),
          },
        ]}
      />
    </>
  )
}

export default FiatOnrampPage
