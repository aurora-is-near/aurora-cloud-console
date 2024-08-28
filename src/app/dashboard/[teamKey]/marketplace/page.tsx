import Layout from "@/app/dashboard/Layout"
import {
  BlockExplorer,
  Bridge,
  CexWithdrawals,
  DIA,
  Kyc,
  Ocean,
  Onramp,
  Oracle,
  Pyth,
  Safe,
  TheGraph,
  Uniswap,
} from "../../../../../public/static/v2/images/icons"
import Card from "@/components/Card"
import { ReactNode } from "react"

interface CardProps {
  title: string
  description: string
  icon: ReactNode
}

const services = [
  {
    title: "Bridge",
    description:
      "Attract liquidity by enabling bridging from other chains and transfers from CEXes to your chain.",
    icon: <Bridge />,
    native: true,
  },
  {
    title: "Oracle",
    description:
      "Access reliable data from over 95 top publishers and integrate precise pricing data.",
    icon: <Oracle />,
    native: true,
  },
  {
    title: "Onramp",
    description:
      "Enable your users to onramp from fiat to crypto directly on your silo.",
    icon: <Onramp />,
    native: true,
  },
  {
    title: "CEX Withdrawals",
    description:
      "Allow your users to deposit assets directly from centralized exchanges to your chain.",
    icon: <CexWithdrawals />,
    native: true,
  },
  {
    title: "Block Explorer",
    description: "Enjoy a blockchain explorer dedicated to your chain.",
    icon: <BlockExplorer />,
    native: true,
  },
  {
    title: "KYC",
    description: "You can choose to gate your silo access through KYC.",
    icon: <Kyc />,
    native: true,
  },

  {
    title: "Safe",
    description:
      "Leverage the most secure multi-sign wallet to store and manage digital assets. ",
    icon: <Safe />,
  },
  {
    title: "Uniswap",
    description: "A growing network of DeFi apps.",
    icon: <Uniswap />,
  },
  {
    title: "The Graph",
    description: "Query and index data from networks like Ethereum and IPFS.",
    icon: <TheGraph />,
  },
  {
    title: "Pyth",
    description: "Smarter data for smarter contracts.",
    icon: <Pyth />,
  },
  {
    title: "DIA",
    description: "The cross-chain data and oracle platform for Web3.",
    icon: <DIA />,
  },
  {
    title: "Ocean Market",
    description: "Publish and trade datasets.",
    icon: <Ocean />,
  },
]

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div className="w-full">
          <h1 className="text-2xl text-slate-900 tracking-tighter font-semibold">
            Marketplace
          </h1>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <h1 className="mt-5 text-slate-500 text-xs uppercase font-bold tracking-widest">
            native integrations
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {services
              .filter((s) => s.native)
              .map((card) => (
                <Card>
                  <FeatureCard card={card} />
                </Card>
              ))}
          </div>
          <h1 className="mt-5 text-slate-500 text-xs uppercase font-bold tracking-widest">
            other integrations
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {services
              .filter((s) => !s.native)
              .map((card) => (
                <Card>
                  <FeatureCard card={card} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

const FeatureCard = ({ card }: { card: CardProps }) => {
  return (
    <div className="flex flex-row items-start justify-around gap-3">
      <div className="max-w-fit w-fit">{card.icon}</div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-[16px] text-slate-900 font-medium">{card.title}</h2>
        <span className="text-slate-500 text-xs">{card.description}</span>
      </div>
      <div className="w-[30px] h-[20px] border border-red-500">
        {/* Placeholder for Check/Radio */}
      </div>
    </div>
  )
}

export default Page
