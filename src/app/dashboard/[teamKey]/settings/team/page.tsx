import { DashboardPage } from "@/components/DashboardPage"
import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { getTeamMembers } from "@/actions/team-members/get-team-members"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import InviteButton from "./InviteButton"
import { TeamMembersTable } from "./TeamMembersTable"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const [currentUser, team, teamMembers] = await Promise.all([
    getCurrentUser(),
    getTeamByKey(teamKey),
    getTeamMembers(teamKey),
  ])

  return (
    <DashboardPage heading="Team" actions={<InviteButton team={team} />}>
      <TeamMembersTable
        teamKey={teamKey}
        currentUser={currentUser}
        teamMembers={teamMembers}
      />
    </DashboardPage>
  )
}

export default Page
