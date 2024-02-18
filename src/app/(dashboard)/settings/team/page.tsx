import InviteButton from "./InviteButton"
import { TeamMembersTable } from "@/app/(dashboard)/settings/team/TeamMembersTable"
import InviteConfirmedModal from "@/app/(dashboard)/settings/team/InviteConfirmedModal"
import InviteModal from "@/app/(dashboard)/settings/team/InviteModal"
import { DashboardPage } from "@/components/DashboardPage"
import { getCurrentUser } from "@/actions/admin/current-user/get-current-user"

const Page = async () => {
  const currentUser = await getCurrentUser()

  return (
    <DashboardPage heading="Team" actions={<InviteButton />}>
      <TeamMembersTable currentUser={currentUser} />
      <InviteModal />
      <InviteConfirmedModal />
    </DashboardPage>
  )
}

export default Page
