import { redirect } from "next/navigation"
import Layout from "@/app/dashboard_v2/Layout"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import EmptyState from "@/app/dashboard_v2/[teamKey]/gas_abstraction/EmptyState"
import { getTeamDeals } from "@/actions/team-deals/get-team-deals"
import GasAbstractionHero from "@/app/dashboard_v2/[teamKey]/gas_abstraction/GasAbstractionHero"
import DealList from "@/app/dashboard_v2/[teamKey]/gas_abstraction/DealList"
import Contact from "@/components/Contact"
import SubTitle from "@/components/v2/dashboard/SubTitle"

// TODO
// Link on Create Chain Button

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  if (!teamKey) {
    redirect("/dashboard")
  }

  const team = await getTeamByKey(teamKey)
  const deals = await getTeamDeals(team.id)

  return (
    <Layout team={team}>
      {deals.length > 0 ? (
        <div className="divide-y flex flex-col gap-10">
          <GasAbstractionHero team={team} deals={deals} />
          <div className="flex flex-col pt-10 gap-5">
            <SubTitle>Your gas plans</SubTitle>
            <DealList team={team} deals={deals} />

            <div className="mt-10">
              <Contact
                text="Need help configuring your plans?"
                teamKey={teamKey}
              />
            </div>
          </div>
        </div>
      ) : (
        <EmptyState team={team} />
      )}
    </Layout>
  )
}

export default Page
