import InviteButton from "./InviteButton"
import { TeamMembersTable } from "@/app/(dashboard)/settings/team/TeamMembersTable"
import InviteConfirmedModal from "@/app/(dashboard)/settings/team/InviteConfirmedModal"
import InviteModal from "@/app/(dashboard)/settings/team/InviteModal"
import { DashboardPage } from "@/components/DashboardPage"
import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { getTeamMembers } from "@/actions/team-members/get-team-members"
import { getCurrentTeam } from "@/actions/current-team/get-current-team"

const Page = async () => {
  const [currentUser, team, teamMembers] = await Promise.all([
    getCurrentUser(),
    getCurrentTeam(),
    getTeamMembers(),
  ])

  return (
    <DashboardPage heading="Team" actions={<InviteButton />}>
      <TeamMembersTable currentUser={currentUser} teamMembers={teamMembers} />
      <InviteModal team={team} />
      <InviteConfirmedModal />
    </DashboardPage>
  )
}

export default Page
