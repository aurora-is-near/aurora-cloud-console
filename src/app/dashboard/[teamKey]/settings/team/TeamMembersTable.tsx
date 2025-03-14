"use client"

import {
  CheckIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline"
import { useQueryState } from "next-usequerystate"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import Table from "@/components/Table"
import TableButton from "@/components/TableButton"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { TeamMember, User } from "@/types/types"
import { reinviteUser } from "@/actions/invite/reinvite-user"
import { toError } from "@/utils/errors"
import { deleteTeamMember } from "@/actions/team-members/delete-team-member"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { Pill } from "@/components/Pill"

type TeamMembersTableProps = {
  teamKey: string
  currentUser: User
  teamMembers: TeamMember[]
}

export const TeamMembersTable = ({
  teamKey,
  currentUser,
  teamMembers,
}: TeamMembersTableProps) => {
  const [, setErrorTitle] = useQueryState("error_title")
  const [, setErrorDescription] = useQueryState("error_description")
  const { openModal } = useModals()
  const [, setEmail] = useQueryState("email")
  const router = useRouter()

  const onDeleteTeamMemberClick = useCallback(
    async (teamMember: TeamMember) => {
      await deleteTeamMember(teamKey, teamMember.id)
      router.refresh()
    },
    [router, teamKey],
  )

  const onReinviteTeamMemberClick = useCallback(
    async (teamMember: TeamMember) => {
      try {
        await reinviteUser({
          email: teamMember.email,
          origin: window.location.origin,
        })
      } catch (err) {
        await Promise.all([
          setErrorTitle("Invite failed"),
          setErrorDescription(toError(err).message),
        ])
        openModal(Modals.Error)

        return
      }

      await setEmail(teamMember.email)
      openModal(Modals.InviteConfirmed)
    },
    [openModal, setEmail, setErrorDescription, setErrorTitle],
  )

  return (
    <Table>
      <Table.TH>Name</Table.TH>
      <Table.TH>Email</Table.TH>
      <Table.TH>Status</Table.TH>
      <Table.TH hidden>Actions</Table.TH>
      {teamMembers.map((teamMember) => {
        const isCurrentUser = currentUser.id === teamMember.id

        return (
          <Table.TR key={teamMember.email}>
            <Table.TD dark>{teamMember.name ?? "N/A"}</Table.TD>
            <Table.TD>{teamMember.email}</Table.TD>
            <Table.TD>
              {teamMember.isPending ? (
                <Pill variant="pending">
                  <ClockIcon className="w-4 h-4" />
                  Pending
                </Pill>
              ) : (
                <Pill variant="active">
                  <CheckIcon className="w-4 h-4" />
                  Active
                </Pill>
              )}
            </Table.TD>
            <Table.TD align="right">
              {teamMember.isPending && !isCurrentUser ? (
                <TableButton
                  Icon={PaperAirplaneIcon}
                  disabled={currentUser.id === teamMember.id}
                  srOnlyText={`Reinvite ${teamMember.name ?? "user"}`}
                  onClick={async () => {
                    await onReinviteTeamMemberClick(teamMember)
                  }}
                />
              ) : (
                <div className="w-5 h-5" />
              )}
              {!isCurrentUser && (
                <TableDeleteButton
                  title="Remove team member"
                  description={`Remove ${teamMember.name ?? "user"}`}
                  onDelete={async () => {
                    await onDeleteTeamMemberClick(teamMember)
                  }}
                />
              )}
            </Table.TD>
          </Table.TR>
        )
      })}
    </Table>
  )
}
