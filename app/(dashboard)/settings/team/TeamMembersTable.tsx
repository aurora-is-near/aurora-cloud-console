import Table from "@/components/Table"
import TableButton from "@/components/TableButton"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { TeamMember } from "@/types/types"
import { apiClient } from "@/utils/api/client"
import { useCurrentUser } from "@/utils/api/queries"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"

type TeamMembersTableProps = {
  teamMembers: TeamMember[]
}

export const TeamMembersTable = ({ teamMembers }: TeamMembersTableProps) => {
  const getTeamMembersUpdater = useOptimisticUpdater("getTeamMembers")
  const { data: currentUser } = useCurrentUser()

  const { mutate: deleteTeamMember } = useMutation({
    mutationFn: apiClient.deleteTeamMember,
    onMutate: ({ id }) => {
      getTeamMembersUpdater.replace(
        teamMembers?.filter((teamMember) => teamMember.id !== id) || [],
      )
    },
    onSettled: getTeamMembersUpdater.invalidate,
  })

  const onRemoveTeamMemberClick = useCallback(
    (teamMember: TeamMember) => {
      if (confirm(`Are you sure you want to remove ${teamMember.email}?`)) {
        deleteTeamMember({ id: teamMember.id })
      }
    },
    [deleteTeamMember],
  )

  return (
    <Table>
      <Table.TH>Name</Table.TH>
      <Table.TH>Email</Table.TH>
      <Table.TH hidden>Actions</Table.TH>
      {teamMembers.map((teamMember) => (
        <Table.TR key={teamMember.email}>
          <Table.TD dark>{teamMember.name}</Table.TD>
          <Table.TD>{teamMember.email}</Table.TD>
          <Table.TD align="right">
            <TableButton
              Icon={TrashIcon}
              disabled={currentUser?.id === teamMember.id}
              srOnlyText={`Remove ${teamMember.name ?? "user"} from the team`}
              onClick={() => {
                onRemoveTeamMemberClick(teamMember)
              }}
            />
          </Table.TD>
        </Table.TR>
      ))}
    </Table>
  )
}
