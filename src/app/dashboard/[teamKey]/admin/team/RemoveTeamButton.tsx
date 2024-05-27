"use client"

import { deleteTeam } from "@/actions/teams/delete-team"
import { Button } from "@/components/Button"
import { DeleteModal } from "@/components/DeleteModal"
import { HOME_ROUTE } from "@/constants/routes"
import { Team } from "@/types/types"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { useState } from "react"

type RemoveTeamButtonProps = {
  team: Team
}

export const RemoveTeamButton = ({ team }: RemoveTeamButtonProps) => {
  const router = useRouter()
  const title = "Remove team"

  const [isPending, setIsPending] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onDeleteClick = () => {
    setIsModalOpen(true)
  }

  const onModalClose = () => {
    setIsModalOpen(false)
  }

  const onConfirmClick = async () => {
    setIsPending(true)
    await deleteTeam(team.id)
    router.push(HOME_ROUTE)
  }

  return (
    <>
      <Button variant="destructive" onClick={onDeleteClick}>
        <TrashIcon className="w-5 h-5" />
        {title}
      </Button>
      <DeleteModal
        title={title}
        description={`Are you sure you want to delete the team "${team.name}"?`}
        isOpen={isModalOpen}
        onClose={onModalClose}
        onDeleteClick={onConfirmClick}
        isPending={isPending}
      />
    </>
  )
}
