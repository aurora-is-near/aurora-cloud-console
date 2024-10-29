import { notFound } from "next/navigation"
import Image from "next/image"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"
import { DashboardPage } from "@/components/DashboardPage"
import Hero from "@/components/Hero/Hero"
import { Tabs } from "@/components/Tabs/Tabs"
import Contact from "@/components/Contact"
import { getNetworkVariant } from "@/utils/get-network-variant"
import { GasAbstractionPlansTab } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/GasAbstractionPlansTab"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: number; teamKey: string }
}) => {
  const [silo, deals] = await Promise.all([
    getTeamSiloByKey(teamKey, id),
    getTeamDealsByKey(teamKey),
  ])

  if (!silo) {
    notFound()
  }

  return (
    <DashboardPage>
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
      <Tabs
        tabs={[
          {
            title: "Gas plans",
            content: (
              <GasAbstractionPlansTab
                silo={silo}
                teamKey={teamKey}
                deals={deals}
              />
            ),
          },
        ]}
      />
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
            href: `/dashboard/${teamKey}/create-chain`,
          },
          devnet: undefined,
          mainnet: undefined,
        })}
      />
    </DashboardPage>
  )
}

export default Page
