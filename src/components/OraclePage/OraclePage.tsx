import Image from "next/image"
import { DashboardPage } from "@/components/DashboardPage"
import Hero from "@/components/Hero/Hero"
import { TabCard } from "@/components/TabCard/TabCard"
import { Tabs } from "@/components/Tabs/Tabs"
import { Silo } from "@/types/types"
import { Pyth } from "../../../public/static/v2/images/icons"

type OraclePageProps = {
  silo?: Silo | null
}

export const OraclePage = ({ silo = null }: OraclePageProps) => {
  return (
    <DashboardPage>
      <Hero
        title="Oracle"
        description="Secure your smart contracts with reliable, low-latency market data from institutional sources."
        titlePrefix={
          <Image
            width="48"
            height="48"
            src="/static/v2/images/icons/marketplace/oracle.svg"
            alt="Oracle Logo"
          />
        }
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/oracle.png"
            alt="Oracle Preview"
          />
        }
      />
      <Tabs
        tabs={[
          {
            title: "About",
            content: (
              <TabCard
                attribution={{
                  text: "Powered by Pyth",
                  icon: <Pyth />,
                }}
              >
                <div className="flex flex-col gap-2 text-slate-500">
                  <p>
                    The Pyth Oracle strives for decentralisation where prices
                    are collaboratively fed by the different actors in the
                    network.
                  </p>
                  <p>
                    Since all Virtual Chains are communicating with the Pyth
                    Oracle instance on Aurora Mainnet, the more chains and
                    participants there are, the more complete, robust and
                    decentralised its Oracle becomes.
                  </p>
                  <p>
                    Besides, you get access from your Virtual Chain to all the
                    other price feeds from the ecosystem, which means less
                    development and better reliability.
                  </p>
                </div>
              </TabCard>
            ),
          },
        ]}
      />
    </DashboardPage>
  )
}
