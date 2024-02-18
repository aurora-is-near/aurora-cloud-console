"use client"

import { Button } from "@/components/Button"
import Modal from "@/components/Modal"
import { useTransition } from "react"

type DeleteModalProps = {
  title: string
  description: string
  onDeleteClick: () => void
  isOpen: boolean
  onClose: () => void
  deleteButtonText?: string
  isPending?: boolean
}

export const DeleteModal = ({
  title,
  description,
  onDeleteClick,
  isOpen,
  onClose,
  deleteButtonText = "Delete",
  isPending = false,
}: DeleteModalProps) => {
  const [isTransitionPending, startTransition] = useTransition()

  return (
    <Modal title={title} open={isOpen} close={onClose}>
      <p className="text-sm leading-5 text-gray-500">{description}</p>
      <Button
        className="mt-4"
        variant="destructive"
        loading={isPending ?? isTransitionPending}
        onClick={() => {
          startTransition(onDeleteClick)
        }}
      >
        {deleteButtonText}
      </Button>
    </Modal>
  )
}
