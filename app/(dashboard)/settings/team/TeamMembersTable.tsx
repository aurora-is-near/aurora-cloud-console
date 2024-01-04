import Table from "@/components/Table"
import TableButton from "@/components/TableButton"
import { Modals, useModals } from "@/hooks/useModals"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { TeamMember } from "@/types/types"
import { apiClient } from "@/utils/api/client"
import { useCurrentUser } from "@/utils/api/queries"
import { TrashIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useMutation } from "@tanstack/react-query"
import { useQueryState } from "next-usequerystate"
import { useCallback } from "react"

type TeamMembersTableProps = {
  teamMembers: TeamMember[]
}

export const TeamMembersTable = ({ teamMembers }: TeamMembersTableProps) => {
  const getTeamMembersUpdater = useOptimisticUpdater("getTeamMembers")
  const { data: currentUser } = useCurrentUser()
  const { openModal } = useModals()
  const [, setEmail] = useQueryState("email")

  const { mutate: deleteTeamMember } = useMutation({
    mutationFn: apiClient.deleteTeamMember,
    onMutate: ({ id }) => {
      const newTeamMembers =
        teamMembers?.filter((teamMember) => teamMember.id !== id) || []

      getTeamMembersUpdater.replace({
        total: newTeamMembers.length,
        teamMembers: newTeamMembers,
      })
    },
    onSettled: getTeamMembersUpdater.invalidate,
  })

  const { mutateAsync: reinviteUser } = useMutation({
    mutationFn: apiClient.reinviteUser,
  })

  const onRemoveTeamMemberClick = useCallback(
    (teamMember: TeamMember) => {
      if (confirm(`Are you sure you want to remove ${teamMember.email}?`)) {
        deleteTeamMember({ id: teamMember.id })
      }
    },
    [deleteTeamMember],
  )

  const onReinviteTeamMemberClick = useCallback(
    (teamMember: TeamMember) => {
      reinviteUser({ email: teamMember.email })
      setEmail(teamMember.email)
      openModal(Modals.InviteConfirmed)
    },
    [openModal, reinviteUser, setEmail],
  )

  return (
    <Table>
      <Table.TH>Name</Table.TH>
      <Table.TH>Email</Table.TH>
      <Table.TH>Status</Table.TH>
      <Table.TH hidden>Actions</Table.TH>
      {teamMembers.map((teamMember) => {
        const isCurrentUser = currentUser?.id === teamMember.id

        return (
          <Table.TR key={teamMember.email}>
            <Table.TD dark>{teamMember.name}</Table.TD>
            <Table.TD>{teamMember.email}</Table.TD>
            <Table.TD>{teamMember.isPending ? "Invited" : "Active"}</Table.TD>
            <Table.TD align="right">
              {teamMember.isPending && !isCurrentUser ? (
                <TableButton
                  Icon={PaperAirplaneIcon}
                  disabled={currentUser?.id === teamMember.id}
                  srOnlyText={`Reinvite ${teamMember.name ?? "user"}`}
                  onClick={() => {
                    onReinviteTeamMemberClick(teamMember)
                  }}
                />
              ) : (
                <div className="w-5 h-5" />
              )}
              <TableButton
                Icon={TrashIcon}
                disabled={isCurrentUser}
                srOnlyText={`Remove ${teamMember.name ?? "user"}`}
                onClick={() => {
                  onRemoveTeamMemberClick(teamMember)
                }}
              />
            </Table.TD>
          </Table.TR>
        )
      })}
    </Table>
  )
}
