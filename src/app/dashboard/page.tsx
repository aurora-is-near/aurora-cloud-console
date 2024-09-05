import { PlusCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { isAdmin } from "@/actions/is-admin"
import { getTeams } from "@/actions/teams/get-teams"
import { NotAllowed } from "@/app/auth/login/NotAllowed"
import Card from "@/components/Card"
import { DashboardLayout } from "@/components/DashboardLayout"
import { DashboardPage } from "@/components/DashboardPage"
import { FullScreenPage } from "@/components/FullScreenPage"
import { LinkButton } from "@/components/LinkButton"
import { getUserTeamKeys } from "@/utils/team"
import { Button } from "@/components/Button"

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
        heading="Select a team"
        actions={
          isAdminUser ? (
            <LinkButton href="/dashboard/new">
              <PlusCircleIcon className="w-5 h-5" />
              <span>Create a team</span>
            </LinkButton>
          ) : null
        }
      >
        <ul className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {teams.map((team) => (
            <li key={team.id}>
              <Card>
                <Card.Title>{team.name}</Card.Title>
                <Card.Body>
                  <div className="flex flex-row gap-3">
                    <Link href={`/dashboard/${team.team_key}`}>
                      <Button variant="border">Legacy Dashboard</Button>
                    </Link>
                    <Link href={`/dashboard_v2/${team.team_key}`}>
                      <Button>New Dashboard!</Button>
                    </Link>
                  </div>
                  <span className="text-xs text-gray-500">{team.website}</span>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      </DashboardPage>
    </DashboardLayout>
  )
}

export default Page
