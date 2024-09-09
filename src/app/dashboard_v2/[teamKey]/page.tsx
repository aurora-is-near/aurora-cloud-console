import { redirect } from "next/navigation"
import Layout from "@/app/dashboard_v2/Layout"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import EmptyState from "@/app/dashboard_v2/[teamKey]/EmptyState"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  if (!teamKey) {
    redirect("/dashboard_v1")
  }

  const team = await getTeamByKey(teamKey)

  return (
    <Layout team={team}>
      <EmptyState team={team} />
    </Layout>
  )
}

export default Page
