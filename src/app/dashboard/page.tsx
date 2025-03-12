import { PlusIcon } from "@heroicons/react/24/outline"
import { redirect } from "next/navigation"
import { isAdmin } from "@/actions/is-admin"
import { NotAllowed } from "@/components/NotAllowed"
import { DashboardLayout } from "@/components/DashboardLayout"
import { DashboardPage } from "@/components/DashboardPage"
import { FullScreenPage } from "@/components/FullScreenPage"
import { LinkButton } from "@/components/LinkButton"
import { getTeamSummaries } from "@/actions/teams/get-team-summaries"
import { TeamsList } from "@/app/dashboard/TeamsList"

const Page = async () => {
  const [teamSummaries, isAdminUser] = await Promise.all([
    getTeamSummaries(),
    isAdmin(),
  ])

  if (!teamSummaries.length) {
    return (
      <FullScreenPage>
        <NotAllowed
          showLogoutButton
          title="No teams found"
          description="You are not currently a member of any teams. Please contact your team administrator for an invite."
        />
      </FullScreenPage>
    )
  }

  if (teamSummaries.length === 1) {
    return redirect(`/dashboard/${teamSummaries[0].team_key}`)
  }

  return (
    <DashboardLayout showAdminMenu={isAdminUser}>
      <DashboardPage
        heading="Your teams"
        headingSize="lg"
        className="pt-12"
        actions={
          isAdminUser && (
            <LinkButton href="/dashboard/new">
              <PlusIcon className="w-5 h-5" />
              <span>New team</span>
            </LinkButton>
          )
        }
      >
        <TeamsList teamSummaries={teamSummaries} />
      </DashboardPage>
    </DashboardLayout>
  )
}

export default Page
