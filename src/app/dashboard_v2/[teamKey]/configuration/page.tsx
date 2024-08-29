import { redirect } from "next/navigation"
import Contact from "@/components/Contact"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import Layout from "@/app/dashboard_v2/Layout"
import { SilosTransactionsCharts } from "@/app/dashboard/[teamKey]/silos/SilosTransactionsCharts"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const silos = await getTeamSilos(team.id)

  // If the team has a single silo, redirect to its overview page
  if (silos.length === 1) {
    return redirect(`/dashboard/${teamKey}/configuration/${silos[0].id}`)
  }

  return (
    <Layout>
      <section>
        <SilosTransactionsCharts />
      </section>

      <Contact teamKey={teamKey} text="Need help setting up a silo?" />
    </Layout>
  )
}

export default Page
