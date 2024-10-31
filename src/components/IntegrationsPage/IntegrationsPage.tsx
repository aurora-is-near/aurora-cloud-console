import Image from "next/image"
import Hero from "@/components/Hero/Hero"
import { Tabs } from "@/components/Tabs/Tabs"
import { SubTitle } from "@/components/Subtitle/Subtitle"
import { FeatureCard } from "@/components/FeatureCard/FeatureCard"
import { DashboardPage } from "@/components/DashboardPage"
import {
  BlockExplorer,
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
  UniversalWidget,
} from "../../../public/static/v2/images/icons"

type Category = "analytics" | "onramps" | "explorers" | "defi"

type Integration = {
  title: string
  description: string
  icon: JSX.Element
  checked?: boolean
}

type OtherIntegration = Integration & {
  category: Category
}

const CATEGORIES: { key: Category | "all"; name: string }[] = [
  { key: "all", name: "All" },
  { key: "analytics", name: "Analytics" },
  { key: "onramps", name: "Onramps" },
  { key: "explorers", name: "Explorers" },
  { key: "defi", name: "DEFI" },
]

const NATIVE_INTEGRATIONS: Integration[] = [
  {
    title: "Universal widget",
    description:
      "Send, receive, bridge, pay and onramp on Aurora virtual chains, NEAR and Ethereum.",
    icon: <UniversalWidget />,
    checked: true,
  },
  {
    title: "Fiat to crypto",
    description:
      "Enable your users to onramp from fiat to crypto directly on your silo.",
    icon: <Onramp />,
    checked: true,
  },
  {
    title: "CEX withdrawals",
    description:
      "Allow your users to deposit assets directly from centralized exchanges to your chain.",
    icon: <CexWithdrawals />,
    checked: true,
  },
  {
    title: "Oracle",
    description:
      "Access reliable data from over 95 top publishers and integrate precise pricing data.",
    icon: <Oracle />,
    checked: true,
  },
  {
    title: "Block Explorer",
    description: "Enjoy a blockchain explorer dedicated to your chain.",
    icon: <BlockExplorer />,
    checked: true,
  },
  {
    title: "KYC",
    description: "You can choose to gate your chain access through KYC.",
    icon: <Kyc />,
  },
]

const OTHER_INTEGRATIONS: OtherIntegration[] = [
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

const SECTION_CLASSNAME = "w-full pt-6 md:pt-10"
const INTEGRATIONS_CONTAINER_CLASSNAME = "grid md:grid-cols-3 gap-4 mt-5"

const TABS = CATEGORIES.filter(({ key }) => {
  const hasIntegrations = OTHER_INTEGRATIONS.some(
    ({ category }) => category === key,
  )

  return hasIntegrations || key === "all"
}).map(({ key, name }) => {
  const selectedIntegrations = OTHER_INTEGRATIONS.filter(({ category }) => {
    const isSelected = ["all", category].includes(key)

    return isSelected
  })

  return {
    title: name,
    content: (
      <div className={INTEGRATIONS_CONTAINER_CLASSNAME}>
        {selectedIntegrations.map(({ title, description, icon }) => (
          <FeatureCard
            key={title}
            title={title}
            description={description}
            icon={icon}
          />
        ))}
      </div>
    ),
  }
})

export const IntegrationsPage = () => {
  return (
    <DashboardPage>
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
      <section className={SECTION_CLASSNAME}>
        <SubTitle>Native integrations</SubTitle>
        <div className={INTEGRATIONS_CONTAINER_CLASSNAME}>
          {NATIVE_INTEGRATIONS.map(({ title, description, icon, checked }) => (
            <FeatureCard
              key={title}
              title={title}
              description={description}
              checked={checked}
              icon={icon}
            />
          ))}
        </div>
      </section>
      {false && (
        <section className={SECTION_CLASSNAME}>
          <SubTitle>Other integrations</SubTitle>
          <Tabs tabs={TABS} />
        </section>
      )}
    </DashboardPage>
  )
}
