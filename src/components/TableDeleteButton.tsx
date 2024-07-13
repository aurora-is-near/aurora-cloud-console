"use client"

import { TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import toast from "react-hot-toast"
import TableButton from "@/components/TableButton"
import { DeleteModal } from "@/components/DeleteModal"

type TableDeleteButtonProps = {
  title: string
  description: string
  onDelete: () => Promise<void>
}

export const TableDeleteButton = ({
  title,
  description,
  onDelete,
}: TableDeleteButtonProps) => {
  const [isPending, setIsPending] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onDeleteClick = async () => {
    setIsPending(true)

    try {
      await onDelete()
    } catch (error) {
      toast.error("Failed to delete item")
      console.error(error)
      setIsPending(false)

      return
    }

    window.location.reload()
    setIsPending(false)
  }

  return (
    <>
      <TableButton
        Icon={TrashIcon}
        srOnlyText={title}
        onClick={() => {
          setIsOpen(true)
        }}
      />
      <DeleteModal
        title={title}
        description={description}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        onDeleteClick={onDeleteClick}
        isPending={isPending}
      />
    </>
  )
}
