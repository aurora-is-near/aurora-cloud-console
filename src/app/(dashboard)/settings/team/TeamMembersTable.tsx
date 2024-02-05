"use client"

import Table from "@/components/Table"
import TableButton from "@/components/TableButton"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { TeamMember } from "@/types/types"
import { apiClient } from "@/utils/api/client"
import { TrashIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useQueryState } from "next-usequerystate"
import { useCallback } from "react"
import { getQueryFnAndKey } from "@/utils/api/queries"
import TableLoader from "@/components/TableLoader"

export const TeamMembersTable = () => {
  const { data: teamMembers, isLoading } = useQuery(
    getQueryFnAndKey("getTeamMembers"),
  )

  const getTeamMembersUpdater = useOptimisticUpdater("getTeamMembers")
  const { data: currentUser } = useQuery(getQueryFnAndKey("getCurrentUser"))
  const { openModal } = useModals()
  const [, setEmail] = useQueryState("email")

  const { mutate: deleteTeamMember } = useMutation({
    mutationFn: apiClient.deleteTeamMember,
    onMutate: ({ id }) => {
      const newTeamMembers =
        teamMembers?.items.filter((teamMember) => teamMember.id !== id) || []

      getTeamMembersUpdater.replace({
        total: newTeamMembers.length,
        items: newTeamMembers,
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

  if (isLoading) {
    return <TableLoader />
  }

  return (
    <Table>
      <Table.TH>Email</Table.TH>
      <Table.TH>Name</Table.TH>
      <Table.TH>Status</Table.TH>
      <Table.TH hidden>Actions</Table.TH>
      {teamMembers?.items.map((teamMember) => {
        const isCurrentUser = currentUser?.id === teamMember.id

        return (
          <Table.TR key={teamMember.email}>
            <Table.TD dark>{teamMember.email}</Table.TD>
            <Table.TD>{teamMember.name ?? "-"}</Table.TD>
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
