import { TabCard } from "@/components/TabCard/TabCard"
import { Pyth } from "../../../public/static/v2/images/icons"

export const OracleAboutTab = () => {
  return (
    <TabCard
      attribution={{
        icon: <Pyth />,
        text: "Powered by Pyth",
      }}
    >
      <div className="flex flex-col gap-2 text-[16px] text-slate-500">
        <p>
          The Pyth Oracle strives for decentralisation where prices are
          collaboratively fed by the different actors in the network.
        </p>
        <p>
          Since all Virtual Chains are communicating with the Pyth Oracle
          instance on Aurora Mainnet, the more chains and participants there
          are, the more complete, robust and decentralised its Oracle becomes.
        </p>
        <p>
          Besides, you get access from your Virtual Chain to all the other price
          feeds from the ecosystem, which means less development and better
          reliability.
        </p>
      </div>
    </TabCard>
  )
}
