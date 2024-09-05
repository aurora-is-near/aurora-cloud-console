import { redirect } from "next/navigation"
import Layout from "@/app/dashboard_v2/Layout"
import { getTeams } from "@/actions/teams/get-teams" // Assuming this function exists

const Page = async () => {
  const teams = await getTeams()

  if (teams.length > 0) {
    redirect(`/dashboard_v2/${teams[0].team_key}`)
  } else {
    redirect("/")
  }

  // This return statement will never be reached due to the redirects above
  return <Layout team={teams[0]}>Redirecting...</Layout>
}

export default Page
