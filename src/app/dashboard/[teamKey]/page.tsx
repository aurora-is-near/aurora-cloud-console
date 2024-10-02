import { redirect } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  // Redirecting for now to separate the PRs
  // Next PR will introduce the new dashboard "landing page"
  redirect(`/dashboard/${teamKey}/borealis/deals`)

  return (
    <DashboardPage>
      <div className="space-y-8 sm:space-y-10 md:space-y-12">
        Hello {team.name}
      </div>
    </DashboardPage>
  )
}

export default Page
