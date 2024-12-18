"use client"

import { deleteTeam } from "@/actions/teams/delete-team"
import { TableDeleteButton } from "@/components/TableDeleteButton"
import { Team } from "@/types/types"

type DeleteTeamTableButtonProps = {
  team: Team
}

export const DeleteTeamTableButton = async ({
  team,
}: DeleteTeamTableButtonProps) => {
  const onDelete = async () => deleteTeam(team.id)

  return (
    <TableDeleteButton
      title="Delete team"
      description={`Are you sure you want to delete the team "${team.name}"?`}
      onDelete={onDelete}
    />
  )
}
