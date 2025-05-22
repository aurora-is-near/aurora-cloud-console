"use client"

import Image from "next/image"
import { useContext } from "react"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { NotAvailableBadge } from "@/components/NotAvailableBadge"
import { SiloContext } from "@/providers/SiloProvider"
import { GasAbstractionAboutTab } from "@/components/GasAbstraction/AboutTab"
import { GasAbstractionConsumedTab } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/GasAbstractionConsumedTab"
import { GasAbstractionCollectedTab } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/GasAbstractionCollectedTab"
import { TeamContext } from "@/providers/TeamProvider"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { Tabs } from "@/components/Tabs/Tabs"
import { GasAbstractionPlansTab } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/GasAbstractionPlansTab"
import { canCreateDeal } from "@/utils/can-create-deal"
import { useTeamDeals } from "@/hooks/useTeamDeals"
import AddPlanModal from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/AddPlanModal"

export const GasAbstractionPage = () => {
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useContext(SiloContext) ?? {}
  const { data: deals = [] } = useTeamDeals(team.team_key)

  const tabs = [
    {
      title: "About",
      content: <GasAbstractionAboutTab />,
    },
  ]

  // Display the "Gas collected" tab if a Blockscout database has been set
  // for the silo
  if (silo?.blockscout_database_id) {
    tabs.push(
      {
        title: "Gas consumed",
        content: <GasAbstractionConsumedTab silo={silo} />,
      },
      {
        title: "Gas collected",
        content: <GasAbstractionCollectedTab silo={silo} team={team} />,
      },
    )
  }

  if (silo) {
    tabs.push({
      title: "Gas plans",
      content: (
        <GasAbstractionPlansTab
          silo={silo}
          teamKey={team.team_key}
          deals={deals}
          isNewPlanButtonDisabled={!canCreateDeal(silo, deals)}
        />
      ),
    })
  }

  return (
    <>
      <DashboardPage>
        <Hero
          title="Gas Abstraction"
          description="Boost user experience by covering gas fees and creating custom plans as part of your engagement strategy."
          image={
            <Image
              width="180"
              height="180"
              src="/static/v2/images/heroIcons/gas-abstraction.webp"
              className="mr-16 shadow-xl rounded-[2rem]"
              alt=""
            />
          }
        >
          {!silo && (
            <NotAvailableBadge>
              Available with your Virtual Chain
            </NotAvailableBadge>
          )}
        </Hero>
        <div className="flex flex-col gap-14">
          <Tabs tabs={tabs} />
        </div>
      </DashboardPage>
      {silo && <AddPlanModal siloId={silo.id} team={team} />}
    </>
  )
}
