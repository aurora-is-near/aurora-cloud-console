"use client"

import Heading from "@/components/Heading"
import InviteButton from "./InviteButton"
import TableLoader from "@/components/TableLoader"
import { TeamMembersTable } from "@/app/(dashboard)/settings/team/TeamMembersTable"
import InviteConfirmedModal from "@/app/(dashboard)/settings/team/InviteConfirmedModal"
import InviteModal from "@/app/(dashboard)/settings/team/InviteModal"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { getQueryKey } from "@/utils/api/query-keys"

const Page = () => {
  const { data: teamMembers, isInitialLoading } = useQuery({
    queryFn: apiClient.getTeamMembers,
    queryKey: getQueryKey("getTeamMembers"),
  })

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
