"use client"

import { XCircleIcon } from "@heroicons/react/24/outline"
import { useQueryState } from "next-usequerystate"
import { Button } from "@/components/Button"
import Modal from "@/components/Modal"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

export const ErrorModal = () => {
  const { closeModal, activeModal } = useModals()
  const [errorTitle, setErrorTitle] = useQueryState("error_title")
  const [errorDescription, setErrorDescription] =
    useQueryState("error_description")

  const onClose = () => {
    closeModal()
    void setErrorTitle(null)
    void setErrorDescription(null)
  }

  return (
    <Modal
      title={errorTitle ?? "Unknown Error"}
      open={activeModal === Modals.Error}
      close={onClose}
    >
      <div className="flex flex-col items-center justify-center mt-8 text-center">
        <XCircleIcon className="w-8 h-8 text-red-600 mb-3" aria-hidden="true" />
        {!!errorDescription && (
          <p className="text-sm leading-5 text-gray-500">{errorDescription}</p>
        )}
        <Button className="mt-4" variant="primary" onClick={closeModal}>
          OK
        </Button>
      </div>
    </Modal>
  )
}
