"use client"

import Image from "next/image"
import { useContext } from "react"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

import { useRequiredContext } from "@/hooks/useRequiredContext"

import Hero from "@/components/Hero/Hero"
import { Tabs } from "@/components/Tabs/Tabs"
import { LinkButton } from "@/components/LinkButton"
import { TabCard } from "@/components/TabCard/TabCard"
import { DashboardPage } from "@/components/DashboardPage"
import { IntegrationRequestButton } from "@/components/IntegrationRequestButton"

import { TeamContext } from "@/providers/TeamProvider"
import { SiloContext } from "@/providers/SiloProvider"

import { Trisolaris } from "../../../public/static/images/icons"

export const TrisolarisPage = () => {
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useContext(SiloContext) ?? {}

  const tabs = [
    {
      title: "About",
      content: (
        <TabCard
          attribution={{
            icon: <Trisolaris />,
            text: "Powered by Trisolaris",
          }}
        >
          <div className="flex flex-col gap-2 text-slate-500">
            <p>
              Get your chain listed on Trisolaris, the first and top DEX on the
              Aurora Networks, providing seamless swapping and deep liquidity.
              By integrating, your blockchain appears on Trisolaris.io as an
              available network. This means users will be able to deploy pools
              on your chain and trade assets from the Trisolaris interface.
            </p>
            <p>
              This integration ensures your blockchain is part of the Aurora
              DeFi ecosystem built for speed, efficiency, and interoperability.
              As demand for virtual chains solutions grows, being listed on
              Trisolaris positions your chain at the forefront of the chain
              abstraction innovation that Aurora is spearheading.
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
              src="/static/images/icons/marketplace/trisolaris.svg"
              alt="Trisolaris Logo"
            />
            DEX
          </>
        }
        description="Get your chain listed on Trisolaris, the first decentralized exchange on the Aurora network."
        image={
          <Image
            width="400"
            height="240"
            src="/static/images/feature/hero/trisolaris.png"
            alt="Trisolaris Preview"
          />
        }
      >
        <div className="flex justify-start gap-2">
          {silo && (
            <IntegrationRequestButton
              showUpdateIconPrompt
              silo={silo}
              team={team}
              integrationType="trisolaris"
              requestReceivedMessage="Your chain will be integrated within 1-2 business days. To enhance your visibility on Trisolaris, be sure to upload your blockchain icon."
            />
          )}
          <LinkButton
            isExternal
            variant="border"
            href="https://www.trisolaris.io/"
            size="lg"
          >
            <span>Open Trisolaris</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </LinkButton>
        </div>
      </Hero>

      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
