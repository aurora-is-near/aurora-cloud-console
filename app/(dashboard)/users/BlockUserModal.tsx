"use client"

import Button from "@/components/Button"
import Modal from "@/components/Modal"
import { useTransition } from "react"
import { blockUser } from "./actions/block-user"
import { useQueryState } from "next-usequerystate"

const BlockUserModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean
  close: () => void
}) => {
  const [isPending, startTransition] = useTransition()
  const [address, setAddress] = useQueryState("address")

  const closeModal = () => {
    setAddress(null)
    close()
  }

  const handleBlockUser = async () => {
    if (!address) return

    await blockUser(address)
    closeModal()
  }

  return (
    <Modal title="Block address" open={isOpen} close={closeModal}>
      <p className="text-sm leading-5 text-gray-500">
        You are about to block this address. It will also be removed from
        associated deals. Are you sure you want to proceed?
      </p>
      <Button
        className="mt-4"
        style="destructive"
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
