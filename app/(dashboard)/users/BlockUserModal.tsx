"use client"

import { useTransition } from "react"
import { useQueryState } from "next-usequerystate"
import Modal from "@/components/Modal"
import Button from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { blockUser } from "./actions/block-user"

const BlockUserModal = () => {
  const { activeModal, closeModal } = useModals()
  const [isPending, startTransition] = useTransition()
  const [address, setAddress] = useQueryState("address")
  const isOpen = activeModal === Modals.BlockAddress

  const close = () => {
    setAddress(null)
    closeModal()
  }

  const handleBlockUser = async () => {
    if (!address) {
      return
    }

    await blockUser(address)
    close()
  }

  return (
    <Modal title="Block address" open={isOpen} close={close}>
      <p className="text-sm leading-5 text-gray-500">
        You are about to block this address. It will also be removed from
        associated deals. Are you sure you want to proceed?
      </p>
      <Button
        className="mt-4"
        type="destructive"
        loading={isPending}
        onClick={() => {
          startTransition(() => {
            handleBlockUser()
          })
        }}
      >
        Block
      </Button>
    </Modal>
  )
}

export default BlockUserModal
