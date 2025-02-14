"use client"

import Modal from "@/components/Modal"
import { Button } from "@/components/Button"
import { Typography } from "@/uikit"

type Props = {
  isOpen: boolean
  onClose: () => void
  onClickEdit: () => void
  onClickConfirm: () => void
}

export const ModalConfirmDeployment = ({
  isOpen,
  onClose,
  onClickConfirm,
  onClickEdit,
}: Props) => {
  return (
    <Modal
      title="Ready to deploy your virtual chain?"
      open={isOpen}
      close={onClose}
    >
      <div className="flex flex-col items-center mt-4">
        <Typography variant="paragraph" size={4} className="text-gray-500">
          Once you start deployment, core settings like gas mechanics,
          permissions, and base token will be locked and cannot be changed.
          Ensure everything is set before proceeding.
        </Typography>
        <div className="w-full h-[1px] bg-gray-200 my-6" />
        <div className="flex flex-col w-full space-y-4">
          <Button
            fullWidth
            size="lg"
            variant="primary"
            onClick={onClickConfirm}
          >
            Start deployment
          </Button>
          <Button fullWidth size="lg" variant="border" onClick={onClickEdit}>
            Edit configuration
          </Button>
        </div>
      </div>
    </Modal>
  )
}
