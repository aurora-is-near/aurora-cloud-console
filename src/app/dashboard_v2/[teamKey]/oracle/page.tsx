"use client"

import Image from "next/image"
import Hero from "@/components/v2/dashboard/Hero"
import Tabs from "@/components/v2/Tabs/Tabs"
import { Pyth } from "../../../../../public/static/v2/images/icons"

const AboutTab = () => {
  return (
    <div className="divide-y flex flex-col gap-5">
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
      <div className="pt-5 flex flex-row items-center gap-3">
        <Pyth />
        <span className="text-sm text-slate-600">Powered by Pyth</span>
      </div>
    </div>
  )
}

// const ConfigurationTab = () => {
//   return <div>Config</div>
// }

const Page = () => {
  const tabs = [
    { title: "About", content: <AboutTab /> },
    // { title: "Configuration", content: <ConfigurationTab /> },
  ]

  return (
    <div className="flex flex-col gap-10">
      <Hero
        title="Oracle"
        description="Secure your smart contracts with reliable, low-latency market data from institutional sources."
        button={{
          text: "Enable feature",
          path: "/",
        }}
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

      <Tabs tabs={tabs} />
    </div>
  )
}

export default Page
