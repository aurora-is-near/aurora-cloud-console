import { redirect } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import Layout from "@/app/dashboard_v2/Layout"
import { DealsTransactionsCharts } from "./DealsTransactionsChart"

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
      <DealsTransactionsCharts />
    </Layout>
  )
}

export default Page
