"use client"

import { DeleteModal } from "@/components/DeleteModal"
import TableButton from "@/components/TableButton"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

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
    await onDelete()
    window.location.href = `${window.location.pathname}?operation=deleted`
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
