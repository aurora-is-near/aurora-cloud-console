"use client"

import Heading from "@/components/Heading"
import InviteButton from "./InviteButton"
import { useTeamMembers } from "@/utils/api/queries"
import TableLoader from "@/components/TableLoader"
import { TeamMembersTable } from "@/app/(dashboard)/settings/team/TeamMembersTable"

const Page = () => {
  const { data: teamMembers, isInitialLoading } = useTeamMembers()

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
    </>
  )
}

export default Page
