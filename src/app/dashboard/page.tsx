import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { isAdmin } from "@/actions/is-admin"
import { getTeams } from "@/actions/teams/get-teams"
import { NotAllowed } from "@/app/auth/login/NotAllowed"
import { FullScreenPage } from "@/components/FullScreenPage"
import { getUserTeamKeys } from "@/utils/team"
import { redirect } from "next/navigation"

const Page = async () => {
  const [currentUser, teams, isAdminUser] = await Promise.all([
    getCurrentUser(),
    getTeams(),
    isAdmin(),
  ])

  const teamKeys = await getUserTeamKeys(currentUser.id)

  const currentUserTeams = teams.filter(
    (team) => teamKeys.includes(team.team_key) || isAdminUser,
  )

  if (!currentUserTeams.length) {
    return (
      <FullScreenPage>
        <NotAllowed
          title="No teams found"
          description="You are not currently a member of any teams. Please contact your team administrator for an invite."
        />
      </FullScreenPage>
    )
  }

  if (currentUserTeams.length === 1) {
    return redirect(`/dashboard/${currentUserTeams[0].team_key}`)
  }

  return null
}

export default Page
