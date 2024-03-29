import InviteButton from "./InviteButton"
import { TeamMembersTable } from "@/app/dashboard/[teamKey]/settings/team/TeamMembersTable"
import InviteConfirmedModal from "@/app/dashboard/[teamKey]/settings/team/InviteConfirmedModal"
import InviteModal from "@/app/dashboard/[teamKey]/settings/team/InviteModal"
import { DashboardPage } from "@/components/DashboardPage"
import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { getTeamMembers } from "@/actions/team-members/get-team-members"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

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
    <DashboardPage heading="Team" actions={<InviteButton />}>
      <TeamMembersTable
        teamKey={teamKey}
        currentUser={currentUser}
        teamMembers={teamMembers}
      />
      <InviteModal team={team} />
      <InviteConfirmedModal />
    </DashboardPage>
  )
}

export default Page
