import { TabCard } from "@/components/TabCard/TabCard"

export const FiatOnrampAboutTab = () => (
  <TabCard>
    <div className="flex flex-col gap-2 text-slate-500">
      <p>
        You can enable fiat onramp on your chain to let users purchase crypto
        assets with their credit card. Some assets are supported by default such
        as USDT, USDC, AURORA, NEAR, ETH.
      </p>
      <p>
        To enable the purchase of your own asset, please get in touch with your
        account manager.
      </p>
    </div>
    <div className="pt-5 flex flex-row items-center gap-3">
      <span className="text-sm text-slate-600">Powered by Munzen</span>
    </div>
  </TabCard>
)
