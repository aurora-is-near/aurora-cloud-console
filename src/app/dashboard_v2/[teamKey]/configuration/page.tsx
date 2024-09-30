import { redirect } from "next/navigation"
import Contact from "@/components/Contact"
import { SilosTransactionsCharts } from "@/app/dashboard/[teamKey]/silos/SilosTransactionsCharts"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const silos = await getTeamSilos(team.id)

  // If the team has a single silo, redirect to it
  if (silos.length === 1) {
    return redirect(
      `/dashboard_v2/${team.team_key}/configuration/${silos[0].id}`,
    )
  }

  return (
    <>
      <section className="mb-3">
        <SilosTransactionsCharts />
      </section>

      <Contact teamKey={teamKey} text="Need help setting up a silo?" />
    </>
  )
}

export default Page
