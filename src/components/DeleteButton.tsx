"use client"

import { TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import toast from "react-hot-toast"
import { DeleteModal } from "@/components/DeleteModal"
import { Button } from "@/components/Button"
import { logger } from "@/logger"

type DeleteButtonProps = {
  title: string
  description: string
  onDelete: () => Promise<void>
}

export const DeleteButton = ({
  title,
  description,
  onDelete,
}: DeleteButtonProps) => {
  const [isPending, setIsPending] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onDeleteClick = async () => {
    setIsPending(true)

    try {
      await onDelete()
    } catch (error) {
      toast.error("Failed to delete item")
      logger.error(error)
    }

    setIsPending(false)
  }

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        <TrashIcon className="w-5 h-5" />
        {title}
      </Button>
      <DeleteModal
        title={title}
        description={description}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
        onDeleteClick={onDeleteClick}
        isPending={isPending}
      />
    </>
  )
}
