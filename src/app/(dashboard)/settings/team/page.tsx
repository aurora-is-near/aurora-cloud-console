import InviteButton from "./InviteButton"
import { TeamMembersTable } from "@/app/(dashboard)/settings/team/TeamMembersTable"
import InviteConfirmedModal from "@/app/(dashboard)/settings/team/InviteConfirmedModal"
import InviteModal from "@/app/(dashboard)/settings/team/InviteModal"
import { DashboardPage } from "@/components/DashboardPage"
import { getCurrentUser } from "@/actions/admin/current-user/get-current-user"
import { getCurrentTeam } from "@/utils/current-team"
import { headers } from "next/headers"

const Page = async () => {
  const [currentUser, team] = await Promise.all([
    getCurrentUser(),
    getCurrentTeam(headers()),
  ])

  return (
    <DashboardPage heading="Team" actions={<InviteButton />}>
      <TeamMembersTable currentUser={currentUser} />
      <InviteModal team={team} />
      <InviteConfirmedModal />
    </DashboardPage>
  )
}

export default Page
