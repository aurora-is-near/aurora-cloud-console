"use client"

import Table from "@/components/Table"
import TableButton from "@/components/TableButton"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { Team, TeamMember, User } from "@/types/types"
import { apiClient } from "@/utils/api/client"
import { TrashIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useQueryState } from "next-usequerystate"
import { useCallback } from "react"
import { getQueryFnAndKey } from "@/utils/api/queries"
import TableLoader from "@/components/TableLoader"
import { reinviteUser } from "@/actions/invite/reinvite-user"
import { toError } from "@/utils/errors"

type TeamMembersTableProps = {
  currentUser: User | null
}

export const TeamMembersTable = ({ currentUser }: TeamMembersTableProps) => {
  const [, setErrorTitle] = useQueryState("error_title")
  const [, setErrorDescription] = useQueryState("error_description")
  const { data: teamMembers, isLoading } = useQuery(
    getQueryFnAndKey("getTeamMembers"),
  )

  const getTeamMembersUpdater = useOptimisticUpdater("getTeamMembers")

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

  const onRemoveTeamMemberClick = useCallback(
    (teamMember: TeamMember) => {
      if (confirm(`Are you sure you want to remove ${teamMember.email}?`)) {
        deleteTeamMember({ id: teamMember.id })
      }
    },
    [deleteTeamMember],
  )

  const onReinviteTeamMemberClick = useCallback(
    async (teamMember: TeamMember) => {
      try {
        await reinviteUser({
          email: teamMember.email,
          origin: window.location.origin,
        })
      } catch (err) {
        setErrorTitle("Invite failed")
        setErrorDescription(toError(err).message)
        openModal(Modals.Error)
        return
      }

      setEmail(teamMember.email)
      openModal(Modals.InviteConfirmed)
    },
    [openModal, setEmail, setErrorDescription, setErrorTitle],
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
