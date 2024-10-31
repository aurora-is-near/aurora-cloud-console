import { notFound } from "next/navigation"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"
import { Tabs } from "@/components/Tabs/Tabs"
import { GasAbstractionPage } from "@/components/GasAbstractionPage"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { canCreateDeal } from "@/utils/can-create-deal"
import { GasAbstractionPlansTab } from "./GasAbstractionPlansTab"
import AddPlanModal from "./AddPlanModal"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: number; teamKey: string }
}) => {
  const [team, silo, deals] = await Promise.all([
    getTeamByKey(teamKey),
    getTeamSiloByKey(teamKey, id),
    getTeamDealsByKey(teamKey),
  ])

  if (!silo) {
    notFound()
  }

  return (
    <>
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
                  isNewPlanButtonDisabled={!canCreateDeal(silo, deals)}
                />
              ),
            },
          ]}
        />
      </GasAbstractionPage>
      <AddPlanModal team={team} />
    </>
  )
}

export default Page
