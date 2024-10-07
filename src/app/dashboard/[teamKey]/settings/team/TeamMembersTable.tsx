"use client"

import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { useCallback } from "react"
import { useRouter } from "next/navigation"
import Table from "@/components/Table"
import TableButton from "@/components/TableButton"
import { useModals } from "@/hooks/useModals"
import { TeamMember, User } from "@/types/types"
import { reinviteUser } from "@/actions/invite/reinvite-user"
import { toError } from "@/utils/errors"
import { deleteTeamMember } from "@/actions/team-members/delete-team-member"
import { TableDeleteButton } from "@/components/TableDeleteButton"

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
  const { openModal } = useModals()
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
        openModal("Error", {
          title: "Invite failed",
          description: toError(err).message,
        })

        return
      }

      openModal("InviteConfirmed", { email: teamMember.email })
    },
    [openModal],
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
                  onClick={async () => {
                    await onReinviteTeamMemberClick(teamMember)
                  }}
                />
              ) : (
                <div className="w-5 h-5" />
              )}
              <TableDeleteButton
                title="Remove team member"
                description={`Remove ${teamMember.name ?? "user"}`}
                onDelete={async () => {
                  await onDeleteTeamMemberClick(teamMember)
                }}
              />
            </Table.TD>
          </Table.TR>
        )
      })}
    </Table>
  )
}
