"use client"

import { deleteTeam } from "@/actions/teams/delete-team"
import { DeleteButton } from "@/components/DeleteButton"
import { HOME_ROUTE } from "@/constants/routes"
import { Team } from "@/types/types"

type DeleteTeamButtonProps = {
  team: Team
}

export const DeleteTeamButton = ({ team }: DeleteTeamButtonProps) => {
  const onConfirmClick = async () => {
    await deleteTeam(team.id)
    window.location.pathname = HOME_ROUTE
  }

  return (
    <DeleteButton
      title="Delete team"
      description={`Are you sure you want to delete the team "${team.name}"?`}
      onDelete={onConfirmClick}
    />
  )
}
