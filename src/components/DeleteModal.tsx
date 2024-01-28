"use client"

import Button from "@/components/Button"
import Modal from "@/components/Modal"
import { useTransition } from "react"

type DeleteModalProps = {
  title: string
  description: string
  onDeleteClick: () => void
  isOpen: boolean
  onClose: () => void
  deleteButtonText?: string
  isLoading?: boolean
}

export const DeleteModal = ({
  title,
  description,
  onDeleteClick,
  isOpen,
  onClose,
  deleteButtonText = "Delete",
  isLoading = false,
}: DeleteModalProps) => {
  const [isPending, startTransition] = useTransition()

  return (
    <Modal title={title} open={isOpen} close={onClose}>
      <p className="text-sm leading-5 text-gray-500">{description}</p>
      <Button
        className="mt-4"
        style="destructive"
        loading={isLoading ?? isPending}
        onClick={() => {
          startTransition(onDeleteClick)
        }}
      >
        {deleteButtonText}
      </Button>
    </Modal>
  )
}
