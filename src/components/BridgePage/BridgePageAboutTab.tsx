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
        Virtual Chains offer native bridge between virtual chains and with Near,
        Aurora and Ethereum.
      </p>
      <p>The bridge is powered by the battle-tested Rainbow bridge.</p>
      <p>
        To help you integrate the bridge into your application, we integrated it
        in the universal widget, which you can embed as a button on your web
        application.
      </p>
    </div>
  </TabCard>
)
