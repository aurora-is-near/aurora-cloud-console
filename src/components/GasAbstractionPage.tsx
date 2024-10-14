import Image from "next/image"
import { ReactNode } from "react"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import Contact from "@/components/Contact"
import { Silo } from "@/types/types"
import { getNetworkVariant } from "@/utils/get-network-variant"

type GasAbstractionPageProps = {
  teamKey: string
  silo?: Silo | null
  children?: ReactNode
}

export const GasAbstractionPage = async ({
  teamKey,
  silo = null,
  children,
}: GasAbstractionPageProps) => {
  return (
    <DashboardPage>
      <div className="flex flex-col">
        <Hero
          title="Gas Abstraction"
          description="Boost user experience by covering gas fees and creating custom plans as part of your engagement strategy."
          image={
            <Image
              width="180"
              height="180"
              src="/static/v2/images/heroIcons/onramp.png"
              alt=""
            />
          }
        />
        <div className="border-b border-slate-200 my-6 lg:my-12" />
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl text-slate-900 font-bold">Your gas plans</h2>

          {children}

          <Contact
            text={getNetworkVariant(silo, {
              none: "Want to create your own plan?",
              devnet: "Want to create your own plan?",
              mainnet: "Need help configuring your plans?",
            })}
            description={getNetworkVariant(silo, {
              none: "Set up devnet or mainnet chain on Aurora Cloud.",
              devnet: "Upgrade your chain to mainnet.",
              mainnet: "Reach out to our support team to get assistance.",
            })}
            teamKey={teamKey}
            button={getNetworkVariant(silo, {
              none: {
                text: "Create chain",
                href: `/dashboard_v2/${teamKey}/create-chain`,
              },
              devnet: undefined,
              mainnet: undefined,
            })}
          />
        </div>
      </div>
    </DashboardPage>
  )
}
