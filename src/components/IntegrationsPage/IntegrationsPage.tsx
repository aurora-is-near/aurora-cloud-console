import Image from "next/image"
import Hero from "@/components/Hero/Hero"
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
import { GasAbstraction } from "../../../public/static/v2/images/menuIcons"

type Category = "analytics" | "onramps" | "explorers" | "defi"

type Integration = {
  title: string
  description: string
  icon: JSX.Element
  checked?: boolean
  link?: string
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
    link: "/dashboard/[teamKey]/silos/[id]/onramp/universal-widget",
  },
  {
    title: "Fiat to crypto",
    description:
      "Enable your users to onramp from fiat to crypto directly on your silo.",
    icon: <Onramp />,
    checked: true,
    link: "/dashboard/[teamKey]/silos/[id]/onramp/fiat-to-crypto",
  },
  {
    title: "CEX withdrawals",
    description:
      "Allow your users to deposit assets directly from centralized exchanges to your chain.",
    icon: <CexWithdrawals />,
    checked: true,
    link: "/dashboard/[teamKey]/silos/[id]/onramp/universal-widget",
  },
  {
    title: "Oracle",
    description:
      "Access reliable data from over 95 top publishers and integrate precise pricing data.",
    icon: <Oracle />,
    checked: true,
    link: "/dashboard/[teamKey]/silos/[id]/oracle",
  },
  {
    title: "Block Explorer",
    description: "Enjoy a blockchain explorer dedicated to your chain.",
    icon: <BlockExplorer />,
    checked: true,
    link: "/dashboard/[teamKey]/silos/[id]/block-explorer",
  },
  {
    title: "KYC",
    description: "You can choose to gate your chain access through KYC.",
    icon: <Kyc />,
  },
  {
    title: "Gas Abstraction",
    description:
      "Enable your users to pay for transactions with a gas plan, including free transactions under defined conditions.",
    icon: (
      <div className="w-10 h-10 bg-slate-900 text-slate-50 flex items-center justify-center rounded-xl">
        <GasAbstraction />
      </div>
    ),
    checked: true,
    link: "/dashboard/[teamKey]/silos/[id]/gas-abstraction",
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

const INTEGRATIONS_CONTAINER_CLASSNAME = "grid md:grid-cols-3 gap-4 mt-5"

// The "Other integrations" section was removed. See:
// https://www.figma.com/design/83g9SAME00sIuoOPqd8EYj/Aurora-Cloud?node-id=4576-21914&t=Xo3JQJH3xXQjKwJM-4
const _TABS = CATEGORIES.filter(({ key }) => {
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

export const IntegrationsPage = ({
  teamKey,
  siloId,
}: {
  teamKey: string
  siloId?: number
}) => {
  return (
    <DashboardPage>
      <Hero
        hasDivider
        title="Integrations"
        description="Supercharge your chain with our marketplace. Boost user experience by covering gas fees and creating custom plans as part of your engagement strategy. Supercharge your chain with our marketplace. "
        image={
          <Image
            width="180"
            height="180"
            src="/static/v2/images/heroIcons/integrations.webp"
            alt="Aurora Cloud"
            className="mr-16 shadow-xl rounded-[2rem]"
          />
        }
      />
      <section className="w-full">
        <SubTitle>Native integrations</SubTitle>
        <div className={INTEGRATIONS_CONTAINER_CLASSNAME}>
          {NATIVE_INTEGRATIONS.map(
            ({ title, description, icon, checked, link }) => (
              <FeatureCard
                key={title}
                title={title}
                description={description}
                checked={checked}
                icon={icon}
                link={link
                  ?.replace("[teamKey]", teamKey)
                  .replace(
                    "/silos/[id]",
                    siloId ? `/silos/${siloId?.toString()}` : "",
                  )}
              />
            ),
          )}
        </div>
      </section>
    </DashboardPage>
  )
}
