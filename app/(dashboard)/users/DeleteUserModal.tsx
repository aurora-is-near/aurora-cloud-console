"use client"

import { useTransition } from "react"
import { useQueryState } from "next-usequerystate"
import Modal from "@/components/Modal"
import Button from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { deleteUser } from "./actions/delete-user"

const DeleteUserModal = () => {
  const { activeModal, closeModal } = useModals()
  const [isPending, startTransition] = useTransition()
  const [address, setAddress] = useQueryState("address")
  const isOpen = activeModal === Modals.DeleteAddress

  const close = () => {
    setAddress(null)
    closeModal()
  }

  const handleDeleteUser = async () => {
    if (!address) {
      return
    }

    await deleteUser(address)
    close()
  }

  return (
    <Modal title="Delete address" open={isOpen} close={close}>
      <p className="text-sm leading-5 text-gray-500">
        You are about to delete this address. It will also be removed from
        associated deals. Are you sure you want to proceed?
      </p>
      <Button
        className="mt-4"
        type="destructive"
        loading={isPending}
        onClick={() => {
          startTransition(() => {
            handleDeleteUser()
          })
        }}
      >
        Remove
      </Button>
    </Modal>
  )
}

export default DeleteUserModal
