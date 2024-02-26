"use client"

import { deleteTeam } from "@/actions/teams/delete-team"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { Team } from "@/types/types"

type RemoveTeamButtonProps = {
  team: Team
}

export const RemoveTeamButton = ({ team }: RemoveTeamButtonProps) => {
  const onDelete = async () => deleteTeam(team.id)

  return (
    <TableDeleteButton
      title="Remove team"
      description={`Are you sure you want to delete the team "${team.name}"?`}
      onDelete={onDelete}
    />
  )
}
