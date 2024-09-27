import Link from "next/link"
import { redirect } from "next/navigation"
import Image from "next/image"
import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { isAdmin } from "@/actions/is-admin"
import { getTeams } from "@/actions/teams/get-teams"
import { NotAllowed } from "@/components/NotAllowed"
import Card from "@/components/Card"
import { FullScreenPage } from "@/components/FullScreenPage"
import { getUserTeamKeys } from "@/utils/team"
import AuroraLogo from "@/components/AuroraLogo"

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
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex flex-row w-full lg:bg-slate-900 lg:p-6">
        <AuroraLogo />
      </div>
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden">
        <div className="flex justify-center w-full h-full overflow-x-hidden overflow-y-auto">
          <div className="w-full max-w-[980px] py-10">
            <div className="flex flex-col pt-10 gap-5">
              <span className="text-2xl text-slate-900 font-bold">
                Your teams
              </span>
              <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {teams.map((team) => (
                  <li key={team.id}>
                    <Link href={`/dashboard_v2/${team.team_key}`}>
                      <Card borderRadius="xl">
                        <Card.Title>
                          <Image
                            width={40}
                            height={40}
                            src="/static/v2/images/heroIcons/cloud.png"
                            alt="Aurora Cloud Console"
                          />
                        </Card.Title>
                        <Card.Body>
                          <div className="flex">
                            <div className="flex-grow pr-4">
                              <h3 className="text-lg font-bold text-slate-700">
                                {team.name}
                              </h3>
                              <span className="text-sm text-slate-700">
                                {team.website}
                              </span>
                            </div>
                            <div className="flex-shrink-0" />
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
