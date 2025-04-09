"use client"

import { useQuery } from "@tanstack/react-query"
import { User } from "@supabase/supabase-js"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeamMembers } from "@/actions/team-members/get-team-members"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"
import { queryKeys } from "@/actions/query-keys"
import { Skeleton } from "@/uikit"
import InviteButton from "./InviteButton"
import { TeamMembersTable } from "./TeamMembersTable"
import InviteConfirmedModal from "./InviteConfirmedModal"
import InviteModal from "./InviteModal"

type TeamPageProps = {
  teamKey: string
  authUser: User
}

export const TeamPage = ({ teamKey, authUser }: TeamPageProps) => {
  const { team } = useRequiredContext(TeamContext)

  const { data: teamMembers } = useQuery({
    queryKey: queryKeys.getTeamMembers(teamKey),
    queryFn: async () => getTeamMembers(teamKey),
  })

  return (
    <DashboardPage heading="Team" actions={<InviteButton />}>
      {teamMembers ? (
        <TeamMembersTable
          teamKey={teamKey}
          authUser={authUser}
          teamMembers={teamMembers}
        />
      ) : (
        <Skeleton.Table />
      )}
      <InviteModal team={team} />
      <InviteConfirmedModal />
    </DashboardPage>
  )
}
