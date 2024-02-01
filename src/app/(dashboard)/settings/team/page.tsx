"use client"

import InviteButton from "./InviteButton"
import TableLoader from "@/components/TableLoader"
import { TeamMembersTable } from "@/app/(dashboard)/settings/team/TeamMembersTable"
import InviteConfirmedModal from "@/app/(dashboard)/settings/team/InviteConfirmedModal"
import InviteModal from "@/app/(dashboard)/settings/team/InviteModal"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"
import { DashboardPage } from "@/components/DashboardPage"

const Page = () => {
  const { data: teamMembers, isLoading } = useQuery(
    getQueryFnAndKey("getTeamMembers"),
  )

  return (
    <DashboardPage heading="Team" actions={<InviteButton />}>
      {isLoading ? (
        <TableLoader />
      ) : (
        <TeamMembersTable teamMembers={teamMembers?.teamMembers ?? []} />
      )}

      <InviteModal />
      <InviteConfirmedModal />
    </DashboardPage>
  )
}

export default Page
