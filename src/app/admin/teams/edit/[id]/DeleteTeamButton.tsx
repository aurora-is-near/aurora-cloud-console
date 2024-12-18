"use client"

import { useRouter } from "next/navigation"
import { DeleteButton } from "@/components/DeleteButton"
import { Team } from "@/types/types"
import { deleteTeam } from "@/actions/teams/delete-team"

type DeleteTeamButtonProps = {
  team: Team
}

export const DeleteTeamButton = ({ team }: DeleteTeamButtonProps) => {
  const router = useRouter()

  const onConfirmClick = async () => {
    await deleteTeam(team.id)
    router.push(`/admin/teams`)
  }

  return (
    <DeleteButton
      title="Delete team"
      description={`Are you sure you want to delete the team "${team.name}"?`}
      onDelete={onConfirmClick}
    />
  )
}
