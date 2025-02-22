import { PlusIcon } from "@heroicons/react/24/outline"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { isAdmin } from "@/actions/is-admin"
import { NotAllowed } from "@/components/NotAllowed"
import { DashboardLayout } from "@/components/DashboardLayout"
import { DashboardPage } from "@/components/DashboardPage"
import { FullScreenPage } from "@/components/FullScreenPage"
import { LinkButton } from "@/components/LinkButton"
import { getUserTeamKeys } from "@/utils/team"
import { getTeamSummaries } from "@/actions/teams/get-team-summaries"
import { getSilosTeams } from "@/actions/silos/get-silos-teams"
import AdminTeamList from "@/components/admin-team-list"

const Page = async () => {
  const [currentUser, teamSummaries, silosTeams, isAdminUser] =
    await Promise.all([
      getCurrentUser(),
      getTeamSummaries(),
      getSilosTeams(),
      isAdmin(),
    ])

  const teamKeys = await getUserTeamKeys(currentUser.id)

  const currentUserTeams = teamSummaries.filter(
    (team) => teamKeys.includes(team.team_key) || isAdminUser,
  )

  if (!currentUserTeams.length) {
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

  if (currentUserTeams.length === 1 && !isAdminUser) {
    return redirect(`/dashboard/${currentUserTeams[0].team_key}`)
  }

  return (
    <DashboardLayout>
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
        <AdminTeamList teamSummaries={teamSummaries} silosTeams={silosTeams} />
      </DashboardPage>
    </DashboardLayout>
  )
}

export default Page
