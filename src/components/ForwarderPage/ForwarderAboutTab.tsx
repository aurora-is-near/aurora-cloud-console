import { TabCard } from "@/components/TabCard/TabCard"
import { AuroraPlus } from "../../../public/static/v2/images/icons"

export const ForwarderAboutTab = () => (
  <TabCard
    attribution={{
      icon: <AuroraPlus />,
      text: "Test on Aurora Plus",
      link: "https://todo.link",
    }}
  >
    <div className="flex flex-col gap-2 text-slate-500">
      <p>
        The forwarder leverages Near Protocol to automatically route assets to
        your chain. This means that any exchange that supports Near as a
        withdrawal method becomes compatible with your chain.
      </p>
      <p>
        The forwarder provides a unique Near address to each user that they can
        use to withdraw assets from the exchange to their account on your
        virtual chain.
      </p>
    </div>
  </TabCard>
)
