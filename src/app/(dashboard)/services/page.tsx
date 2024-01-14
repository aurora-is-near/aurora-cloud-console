"use client"

import Button from "@/components/Button"
import ContactModal from "@/components/ContactModal"
import Heading from "@/components/Heading"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import Image from "next/image"

const services = [
  {
    title: "KYC",
    description: "You can choose to gate your silo access through KYC.",
    imageSrc: "/static/icons/kyc.png",
  },
  {
    title: "Block explorer",
    description: "You can use this feature to deploy tokens on your silos.",
    imageSrc: "/static/icons/explorer.png",
  },
  {
    title: "Onramp",
    description:
      "Enable your users to onramp from fiat to crypto directly on your silo.",
    imageSrc: "/static/icons/onramp.png",
  },
  {
    title: "Safe",
    description: "Gnosis Safe multisig.",
    imageSrc: "/static/icons/safe.png",
  },
  {
    title: "DIA",
    description: "The cross-chain data and oracle platform for Web3.",
    imageSrc: "/static/icons/dia.png",
  },
  {
    title: "Atomica",
    description: "Concentrated Liquidity Pools.",
    imageSrc: "/static/icons/atomica.png",
  },
  {
    title: "The Graph",
    description: "The Graph gosted service, organizing blockchain data.",
    imageSrc: "/static/icons/the-graph.png",
  },
  {
    title: "Ocean Market",
    description: "Publish and trade datasets.",
    imageSrc: "/static/icons/ocean-market.png",
  },
  {
    title: "Chainlink",
    description: "Chainlink oracles. Web3 services platform.",
    imageSrc: "/static/icons/chainlink.png",
  },
  {
    title: "Uniswap",
    description: "A growing network of DeFi apps.",
    imageSrc: "/static/icons/uniswap.png",
  },
  {
    title: "Monitoring",
    description: "Operational dashboards for your data.",
    imageSrc: "/static/icons/monitoring.png",
  },
]

const Page = () => {
  const { openModal } = useModals()

  return (
    <>
      <div className="space-y-6">
        <Heading tag="h2">All services</Heading>
        <div className="space-y-2.5">
          {services.map(({ title, description, imageSrc }) => (
            <div
              key={title}
              className="px-4 py-5 sm:px-5 md:px-6 sm:py-6 rounded-[10px] bg-white border border-gray-200 shadow flex items-start md:items-center gap-x-4 md:gap-x-5"
            >
              <Image
                src={imageSrc}
                alt=""
                height={44}
                width={44}
                className="flex-shrink-0"
              />
              <div className="flex flex-1 md:flex-row flex-col md:items-center gap-y-2.5 items-start md:justify-between gap-x-5">
                <div>
                  <h3 className="text-base leading-none font-medium text-gray-900">
                    {title}
                  </h3>
                  <p className="text-sm mt-1.5 text-gray-500">{description}</p>
                </div>
                <Button
                  style="border"
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => openModal(Modals.Contact)}
                >
                  Contact us
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactModal />
    </>
  )
}

export default Page
