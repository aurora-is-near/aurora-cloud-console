import { TabCard } from "@/components/TabCard/TabCard"
import { RainbowBridge } from "../../../public/static/v2/images/icons"

export const BridgePageAboutTab = () => (
  <TabCard
    attribution={{
      text: "Powered by Rainbow Bridge",
      icon: <RainbowBridge />,
    }}
  >
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
  </TabCard>
)
