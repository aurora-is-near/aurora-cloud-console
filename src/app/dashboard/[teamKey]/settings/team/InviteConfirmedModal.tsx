"use client"

import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { Button } from "@/components/Button"
import Modal from "@/components/Modal"

type InviteConfirmedModalProps = {
  email: string
}

const InviteConfirmedModal = ({ email }: InviteConfirmedModalProps) => {
  const { activeModal, closeModal } = useModals()
  const router = useRouter()

  const handleClose = () => {
    closeModal()
    router.refresh()
  }

  return (
    <Modal
      title="Team member invited"
      open={activeModal === "InviteConfirmed"}
      close={handleClose}
    >
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
