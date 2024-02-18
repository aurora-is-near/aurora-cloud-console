"use client"

import Table from "@/components/Table"
import TableButton from "@/components/TableButton"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { TeamMember, User } from "@/types/types"
import { TrashIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useQueryState } from "next-usequerystate"
import { useCallback } from "react"
import { reinviteUser } from "@/actions/invite/reinvite-user"
import { toError } from "@/utils/errors"
import { deleteTeamMember } from "@/actions/team-members/delete-team-member"
import { useRouter } from "next/navigation"

type TeamMembersTableProps = {
  currentUser: User
  teamMembers: TeamMember[]
}

export const TeamMembersTable = ({
  currentUser,
  teamMembers,
}: TeamMembersTableProps) => {
  const [, setErrorTitle] = useQueryState("error_title")
  const [, setErrorDescription] = useQueryState("error_description")
  const { openModal } = useModals()
  const [, setEmail] = useQueryState("email")
  const router = useRouter()

  const onRemoveTeamMemberClick = useCallback(
    async (teamMember: TeamMember) => {
      if (confirm(`Are you sure you want to remove ${teamMember.email}?`)) {
        await deleteTeamMember(teamMember.id)
        router.refresh()
      }
    },
    [router],
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

  return (
    <Table>
      <Table.TH>Email</Table.TH>
      <Table.TH>Name</Table.TH>
      <Table.TH>Status</Table.TH>
      <Table.TH hidden>Actions</Table.TH>
      {teamMembers.map((teamMember) => {
        const isCurrentUser = currentUser.id === teamMember.id

        return (
          <Table.TR key={teamMember.email}>
            <Table.TD dark>{teamMember.email}</Table.TD>
            <Table.TD>{teamMember.name ?? "-"}</Table.TD>
            <Table.TD>{teamMember.isPending ? "Invited" : "Active"}</Table.TD>
            <Table.TD align="right">
              {teamMember.isPending && !isCurrentUser ? (
                <TableButton
                  Icon={PaperAirplaneIcon}
                  disabled={currentUser.id === teamMember.id}
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
