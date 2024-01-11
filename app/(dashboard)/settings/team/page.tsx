"use client"

import Heading from "@/components/Heading"
import InviteButton from "./InviteButton"
import TableLoader from "@/components/TableLoader"
import { TeamMembersTable } from "@/app/(dashboard)/settings/team/TeamMembersTable"
import InviteConfirmedModal from "@/app/(dashboard)/settings/team/InviteConfirmedModal"
import InviteModal from "@/app/(dashboard)/settings/team/InviteModal"
import { useApiQuery } from "@/utils/api/queries"

const Page = () => {
  const { data: teamMembers, isInitialLoading } = useApiQuery("getTeamMembers")

  return (
    <>
      <div className="flex items-center justify-between mb-7">
        <Heading tag="h2">Team</Heading>
        <InviteButton />
      </div>

      {isInitialLoading ? (
        <TableLoader />
      ) : (
        <TeamMembersTable teamMembers={teamMembers?.teamMembers ?? []} />
      )}

      <InviteModal />
      <InviteConfirmedModal />
    </>
  )
}

export default Page
