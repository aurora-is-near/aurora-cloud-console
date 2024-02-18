"use client"

import { deleteTeam } from "@/actions/teams/delete-team"
import TableButton from "@/components/TableButton"
import { Team } from "@/types/types"
import { TrashIcon } from "@heroicons/react/24/outline"

type RemoveTeamButtonProps = {
  team: Team
}

export const RemoveTeamButton = async ({ team }: RemoveTeamButtonProps) => {
  const onClick = () => {
    if (!confirm(`Are you sure you want to delete the team "${team.name}"?`)) {
      return
    }

    deleteTeam(team.id)
    window.location.href = `${window.location.pathname}?operation=deleted`
  }

  return (
    <TableButton
      Icon={TrashIcon}
      srOnlyText={`Remove ${team.name}`}
      onClick={onClick}
    />
  )
}
