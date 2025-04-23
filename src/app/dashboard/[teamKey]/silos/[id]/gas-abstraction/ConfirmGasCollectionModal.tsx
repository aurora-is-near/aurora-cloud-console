"use client"

import Modal from "@/components/Modal"
import { Button } from "@/components/Button"
import { Typography } from "@/uikit"

type Props = {
  isOpen: boolean
  isLoading: boolean
  onClose: () => void
  onConfirm: () => void
}

export const ConfirmGasCollectionModal = ({
  isOpen,
  isLoading,
  onConfirm,
  onClose,
}: Props) => (
  <Modal title="Confirm Gas Withdrawal" open={isOpen} close={onClose}>
    <div className="flex flex-col items-center mt-4">
      <Typography variant="paragraph" size={4} className="text-gray-500">
        Are you sure you want to withdraw gas?
        <br />
        This action cannot be undone. Please double-check that you've entered a
        valid NEAR address to avoid losing your funds.
      </Typography>
      <div className="w-full h-[1px] bg-gray-200 my-6" />
      <div className="flex flex-col w-full space-y-4">
        <Button
          fullWidth
          size="lg"
          variant="primary"
          onClick={onConfirm}
          loading={isLoading}
        >
          Collect gas
        </Button>
      </div>
    </div>
  </Modal>
)
