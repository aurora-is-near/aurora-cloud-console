"use client"

import { XCircleIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/Button"
import Modal from "@/components/Modal"
import { useModals } from "@/hooks/useModals"

type ErrorModalProps = {
  title: string
  description?: string
}

export const ErrorModal = ({ title, description }: ErrorModalProps) => {
  const { closeModal, activeModal } = useModals()

  return (
    <Modal title={title} open={activeModal === "Error"} close={closeModal}>
      <div className="flex flex-col items-center justify-center mt-8 text-center">
        <XCircleIcon className="w-8 h-8 text-red-600 mb-3" aria-hidden="true" />
        {description && (
          <p className="text-sm leading-5 text-gray-500">{description}</p>
        )}
        <Button className="mt-4" variant="primary" onClick={closeModal}>
          OK
        </Button>
      </div>
    </Modal>
  )
}
