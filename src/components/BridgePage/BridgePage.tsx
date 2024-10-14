import Image from "next/image"
import { Tabs } from "@/components/Tabs/Tabs"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { TabCard } from "@/components/TabCard/TabCard"
import { RainbowBridge } from "../../../public/static/v2/images/icons"

export const BridgePage = () => {
  return (
    <DashboardPage>
      <Hero
        title="Bridge"
        description="Bridge assets between Ethereum, NEAR and Aurora. Configure your bridge widget and embed it."
        titlePrefix={
          <Image
            width="48"
            height="48"
            src="/static/v2/images/icons/marketplace/bridge.svg"
            alt="Bridge Logo"
          />
        }
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/bridge.png"
            alt="Bridge Preview"
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
                  text: "Powered by Rainbow Bridge",
                  icon: <RainbowBridge />,
                }}
              >
                <div className="flex flex-col gap-2 text-slate-500">
                  <p>
                    The forwarder leverages Near Protocol to automatically route
                    assets to your chain. This means that any exchange that
                    supports Near as a withdrawal method becomes compatible with
                    your chain.
                  </p>
                  <p>
                    The forwarder provides a unique Near address to each user
                    that they can use to withdraw assets from the exchange to
                    their account on your virtual chain.
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
