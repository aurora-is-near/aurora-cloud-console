import { notFound } from "next/navigation"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"
import { Tabs } from "@/components/Tabs/Tabs"
import { GasAbstractionPlansTab } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/GasAbstractionPlansTab"
import { GasAbstractionPage } from "@/components/GasAbstractionPage"
import { GasAbstractionAboutTab } from "@/app/dashboard/[teamKey]/silos/[id]/gas-abstraction/GasAbstractionAboutTab"

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
    <GasAbstractionPage teamKey={teamKey} silo={silo}>
      <Tabs
        tabs={[
          {
            title: "About",
            content: <GasAbstractionAboutTab />,
          },
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
    </GasAbstractionPage>
  )
}

export default Page
