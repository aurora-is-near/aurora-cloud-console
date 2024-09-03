import { redirect } from "next/navigation"
import Image from "next/image"
import Layout from "@/app/dashboard_v2/Layout"
import Card from "@/components/Card"
import Hero from "@/components/v2/dashboard/Hero"
import Tabs from "@/components/v2/Tabs/Tabs"
import SubTitle from "@/components/v2/dashboard/SubTitle"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import FeatureCard from "@/app/dashboard_v2/[teamKey]/integrations/FeatureCard"
import {
  BlockExplorer,
  Bridge,
  CexWithdrawals,
  DIA,
  Kyc,
  MarketPyth,
  Ocean,
  Onramp,
  Oracle,
  Safe,
  TheGraph,
  Uniswap,
} from "../../../../../public/static/v2/images/icons"

const categories = [
  { key: "all", name: "All" },
  { key: "analytics", name: "Analytics" },
  { key: "onramps", name: "Onramps" },
  { key: "explorers", name: "Explorers" },
  { key: "defi", name: "DEFI" },
]

const services = [
  {
    title: "Bridge",
    description:
      "Attract liquidity by enabling bridging from other chains and transfers from CEXes to your chain.",
    icon: <Bridge />,
    native: true,
    category: null,
  },
  {
    title: "Oracle",
    description:
      "Access reliable data from over 95 top publishers and integrate precise pricing data.",
    icon: <Oracle />,
    native: true,
    category: null,
  },
  {
    title: "Onramp",
    description:
      "Enable your users to onramp from fiat to crypto directly on your silo.",
    icon: <Onramp />,
    native: true,
    category: null,
  },
  {
    title: "CEX Withdrawals",
    description:
      "Allow your users to deposit assets directly from centralized exchanges to your chain.",
    icon: <CexWithdrawals />,
    native: true,
    category: null,
  },
  {
    title: "Block Explorer",
    description: "Enjoy a blockchain explorer dedicated to your chain.",
    icon: <BlockExplorer />,
    native: true,
    category: null,
  },
  {
    title: "KYC",
    description: "You can choose to gate your silo access through KYC.",
    icon: <Kyc />,
    native: true,
    category: null,
  },

  {
    title: "Safe",
    description:
      "Leverage the most secure multi-sign wallet to store and manage digital assets. ",
    icon: <Safe />,
    category: "explorers",
  },
  {
    title: "Uniswap",
    description: "A growing network of DeFi apps.",
    icon: <Uniswap />,
    category: "defi",
  },
  {
    title: "The Graph",
    description: "Query and index data from networks like Ethereum and IPFS.",
    icon: <TheGraph />,
    category: "analytics",
  },
  {
    title: "Pyth",
    description: "Smarter data for smarter contracts.",
    icon: <MarketPyth />,
    category: "analytics",
  },
  {
    title: "DIA",
    description: "The cross-chain data and oracle platform for Web3.",
    icon: <DIA />,
    category: "analytics",
  },
  {
    title: "Ocean Market",
    description: "Publish and trade datasets.",
    icon: <Ocean />,
    category: "defi",
  },
]

const tabs = categories.map((cat) => {
  return {
    title: cat.name,
    content: (
      <div className="grid grid-cols-3 gap-4">
        {services
          .filter(
            (t) => !t.native && (cat.key === "all" || t.category === cat.key),
          )
          .map((card) => (
            <Card key={card.title} borderRadius="xl">
              <FeatureCard card={card} />
            </Card>
          ))}
      </div>
    ),
  }
})

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  if (!teamKey) {
    redirect("/dashboard_v1")
  }

  const team = await getTeamByKey(teamKey)

  return (
    <Layout team={team}>
      <div className="divide-y flex flex-col gap-10">
        <Hero
          title="Integrations"
          description="Supercharge your chain with our marketplace. Boost user experience by covering gas fees and creating custom plans as part of your engagement strategy. Supercharge your chain with our marketplace. "
          image={
            <Image
              width="180"
              height="180"
              src="/static/v2/images/heroIcons/integrations.png"
              alt="Aurora Cloud"
            />
          }
        />
        <div className="flex flex-col w-full pt-10 gap-5">
          <SubTitle>Native integrations</SubTitle>
          <div className="grid grid-cols-3 gap-4">
            {services
              .filter((s) => s.native)
              .map((card) => (
                <Card key={card.title} borderRadius="xl">
                  <FeatureCard card={card} />
                </Card>
              ))}
          </div>
        </div>
        <div className="flex flex-col w-full pt-10 gap-5 pb-10">
          <SubTitle>Other integrations</SubTitle>
          <Tabs unstyledContent tabs={tabs} />
        </div>
      </div>
    </Layout>
  )
}

export default Page
