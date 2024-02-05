import InviteButton from "./InviteButton"
import { TeamMembersTable } from "@/app/(dashboard)/settings/team/TeamMembersTable"
import InviteConfirmedModal from "@/app/(dashboard)/settings/team/InviteConfirmedModal"
import InviteModal from "@/app/(dashboard)/settings/team/InviteModal"
import { DashboardPage } from "@/components/DashboardPage"

const Page = () => {
  return (
    <DashboardPage heading="Team" actions={<InviteButton />}>
      <TeamMembersTable />
      <InviteModal />
      <InviteConfirmedModal />
    </DashboardPage>
  )
}

export default Page
