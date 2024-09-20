import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { getTeamMembers } from "@/actions/team-members/get-team-members"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import SubTitle from "@/components/v2/dashboard/SubTitle"
import InviteButton from "./InviteButton"
import { TeamMembersTable } from "./TeamMembersTable"
import InviteConfirmedModal from "./InviteConfirmedModal"
import InviteModal from "./InviteModal"

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
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <SubTitle>Teammates</SubTitle>
        <InviteButton />
      </div>
      <TeamMembersTable
        teamKey={teamKey}
        currentUser={currentUser}
        teamMembers={teamMembers}
      />
      <InviteModal team={team} />
      <InviteConfirmedModal />
    </div>
  )
}

export default Page
