import { PlusIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { redirect } from "next/navigation"
import Image from "next/image"
import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { isAdmin } from "@/actions/is-admin"
import { getTeams } from "@/actions/teams/get-teams"
import { NotAllowed } from "@/components/NotAllowed"
import Card from "@/components/Card"
import { DashboardLayout } from "@/components/DashboardLayout"
import { DashboardPage } from "@/components/DashboardPage"
import { FullScreenPage } from "@/components/FullScreenPage"
import { LinkButton } from "@/components/LinkButton"
import { getUserTeamKeys } from "@/utils/team"

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
        heading="Your teams"
        headingSize="lg"
        actions={
          isAdminUser ? (
            <LinkButton href="/dashboard/new">
              <PlusIcon className="w-5 h-5" />
              <span>New team</span>
            </LinkButton>
          ) : null
        }
      >
        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-6">
          {teams.map((team) => (
            <li key={team.id} className="flex">
              <Link
                href={`/dashboard/${team.team_key}`}
                className="flex w-full"
              >
                <Card className="w-full">
                  <Card.Header>
                    <Image
                      width={64}
                      height={64}
                      src="/static/v2/images/heroIcons/cloud.png"
                      alt="Aurora Cloud Console"
                    />
                  </Card.Header>
                  <Card.Title size="large">{team.name}</Card.Title>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </DashboardPage>
    </DashboardLayout>
  )
}

export default Page
