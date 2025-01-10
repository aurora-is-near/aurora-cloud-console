import Image from "next/image"
import Hero from "@/components/Hero/Hero"
import { SubTitle } from "@/components/Subtitle/Subtitle"
import { FeatureCard } from "@/components/FeatureCard/FeatureCard"
import { DashboardPage } from "@/components/DashboardPage"
import { AuroraOracle } from "@/types/oracle"
import {
  BlockExplorer,
  CexWithdrawals,
  Kyc,
  Onramp,
  Oracle,
  UniversalWidget,
} from "../../../public/static/v2/images/icons"
import { GasAbstraction } from "../../../public/static/v2/images/menuIcons"

type Integration = {
  title: string
  description: string
  icon: JSX.Element
  checked?: boolean
  link?: string
}

const INTEGRATIONS_CONTAINER_CLASSNAME = "grid md:grid-cols-3 gap-4 mt-5"

export const IntegrationsPage = ({
  teamKey,
  siloId,
  oracle,
}: {
  teamKey: string
  siloId?: number
  oracle?: AuroraOracle
}) => {
  const { address: oracleAddress } = oracle?.contract ?? {}

  const nativeIntegrations: Integration[] = [
    {
      title: "Universal widget",
      description:
        "Send, receive, bridge, pay and onramp on Aurora virtual chains, NEAR and Ethereum.",
      icon: <UniversalWidget />,
      link: "/dashboard/[teamKey]/silos/[id]/onramp/universal-widget",
    },
    {
      title: "Fiat to crypto",
      description:
        "Enable your users to onramp from fiat to crypto directly on your silo.",
      icon: <Onramp />,
      link: "/dashboard/[teamKey]/silos/[id]/onramp/fiat-to-crypto",
    },
    {
      title: "CEX withdrawals",
      description:
        "Allow your users to deposit assets directly from centralized exchanges to your chain.",
      icon: <CexWithdrawals />,
      link: "/dashboard/[teamKey]/silos/[id]/onramp/universal-widget",
    },
    {
      title: "Oracle",
      description:
        "Access reliable data from over 95 top publishers and integrate precise pricing data.",
      icon: <Oracle />,
      checked: !!oracleAddress,
      link: "/dashboard/[teamKey]/silos/[id]/oracle",
    },
    {
      title: "Block Explorer",
      description: "Enjoy a blockchain explorer dedicated to your chain.",
      icon: <BlockExplorer />,
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
      link: "/dashboard/[teamKey]/silos/[id]/gas-abstraction",
    },
  ]

  return (
    <DashboardPage>
      <Hero
        hasDivider
        title="Integrations"
        description="Aurora Chains come with built-in integrations, providing a production-ready environment from day one. Plus, explore additional integrations to supercharge your Virtual Chain."
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
          {nativeIntegrations.map(
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
