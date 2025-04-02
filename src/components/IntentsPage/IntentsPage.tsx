"use client"

import Image from "next/image"
import { useContext } from "react"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { Tabs } from "@/components/Tabs/Tabs"
import { LinkButton } from "@/components/LinkButton"
import { TabCard } from "@/components/TabCard/TabCard"
import { IntegrationRequestButton } from "@/components/IntegrationRequestButton"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"
import { SiloContext } from "@/providers/SiloProvider"

import { NearIntents } from "../../../public/static/v2/images/icons"

export const IntentsPage = () => {
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useContext(SiloContext) ?? {}

  const tabs = [
    {
      title: "About",
      content: (
        <TabCard
          attribution={{
            icon: <NearIntents />,
            text: "Powered by Near Intents",
          }}
        >
          <div className="flex flex-col gap-2 text-slate-500">
            <p>
              Get your chain listed on Near Intents, the first cross-chain DEX
              leveraging chain abstraction to create a seamless trading
              experience. By integrating, your blockchain gains direct access to
              Near, Solana, Base, Ethereum, and all virtual chains, enabling
              frictionless asset transfers and unlocking new liquidity streams.
              With Near Intents, users can swap assets effortlessly across
              networks without the usual complexities of bridging and wrapping.
            </p>
            <p>
              This integration ensures your blockchain is part of a
              next-generation ecosystem designed for speed, efficiency, and
              interoperability. As more users and developers seek cross-chain
              solutions, being listed on Near Intents positions your chain at
              the forefront of innovation, making it easier than ever to
              connect, trade, and grow within the broader Web3 landscape.
            </p>
          </div>
        </TabCard>
      ),
    },
  ]

  return (
    <DashboardPage>
      <Hero
        title={
          <>
            <Image
              width="48"
              height="48"
              src="/static/v2/images/icons/marketplace/near_intents.svg"
              alt="Near Intents Logo"
            />
            Near Intents
          </>
        }
        description="Get your chain listed on Near Intents, the first cross chain DEX leveraging chain abstraction."
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/near_intents.png"
            alt="Near Intents Preview"
          />
        }
      >
        <div className="flex justify-start gap-2">
          {silo && (
            <IntegrationRequestButton
              silo={silo}
              team={team}
              integration="intents"
            />
          )}
          <LinkButton
            isExternal
            variant="border"
            href="https://near-intents.org/"
            size="lg"
          >
            <span>Open Near Intents</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </LinkButton>
        </div>
      </Hero>

      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
