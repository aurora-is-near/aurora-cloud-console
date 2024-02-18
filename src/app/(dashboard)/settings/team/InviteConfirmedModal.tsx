"use client"

import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Button } from "@/components/Button"
import Modal from "@/components/Modal"
import { useQueryState } from "next-usequerystate"
import { useRouter } from "next/navigation"

const InviteConfirmedModal = () => {
  const { activeModal, closeModal } = useModals()
  const isOpen = activeModal === Modals.InviteConfirmed
  const [email] = useQueryState("email")
  const router = useRouter()

  const handleClose = () => {
    closeModal()
    router.refresh()
  }

  return (
    <Modal title="Team member invited" open={isOpen} close={handleClose}>
      <div className="flex flex-col items-center justify-center mt-8 text-center">
        <CheckCircleIcon
          className="w-8 h-8 text-green-600"
          aria-hidden="true"
        />
        <h2 className="mt-3 text-base font-medium leading-4 text-gray-900">
          Invitation sent!
        </h2>
        <p className="mt-1 text-sm leading-5 text-gray-500">
          Invitation was sent to <br />
          {email}
        </p>
        <Button
          onClick={handleClose}
          size="sm"
          className="mt-4"
          variant="secondary"
        >
          Close
        </Button>
      </div>
    </Modal>
  )
}

export default InviteConfirmedModal
