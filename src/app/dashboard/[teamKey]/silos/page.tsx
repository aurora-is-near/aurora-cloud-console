import Contact from "@/components/Contact"
import { SilosTransactionsCharts } from "./SilosTransactionsCharts"
import { DashboardPage } from "@/components/DashboardPage"
import { redirect } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const silos = await getTeamSilos(team.id)

  // If the team has a single silo, redirect to its overview page
  if (silos.length === 1) {
    return redirect(`/dashboard/${teamKey}/silos/${silos[0].id}/overview`)
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
