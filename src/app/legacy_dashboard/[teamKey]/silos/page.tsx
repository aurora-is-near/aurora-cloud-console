import { redirect } from "next/navigation"
import { DashboardPage } from "@/components/DashboardPage"
import Contact from "@/components/Contact"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { SilosTransactionsCharts } from "./SilosTransactionsCharts"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const silos = await getTeamSilos(team.id)

  // If the team has a single silo, redirect to its overview page
  if (silos.length === 1) {
    return redirect(
      `/legacy_dashboard/${teamKey}/silos/${silos[0].id}/overview`,
    )
  }

  return (
    <DashboardPage>
      <section>
        <SilosTransactionsCharts />
      </section>

      <Contact teamKey={teamKey} text="Need help setting up a silo?" />
    </DashboardPage>
  )
}

export default Page
