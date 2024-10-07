"use client"

import { useMutation } from "@tanstack/react-query"
import { usePathname, useRouter } from "next/navigation"
import { DeleteModal } from "@/components/DeleteModal"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { useModals } from "@/hooks/useModals"

type DeleteListModalProps = {
  teamKey: string
  id: number
}

export const DeleteListModal = ({ teamKey, id }: DeleteListModalProps) => {
  const { activeModal, closeModal } = useModals()
  const pathname = usePathname()
  const router = useRouter()

  const getListsUpdater = useOptimisticUpdater("getLists")

  const { mutate: deleteList, isPending } = useMutation({
    mutationFn: apiClient.deleteList,
    onSettled: getListsUpdater.invalidate,
  })

  const onDeleteClick = async () => {
    deleteList(
      { id },
      {
        onSettled: () => {
          closeModal()

          // If we're on a subpage of the deleted list then go back to the lists
          // overview page.
          if (pathname.startsWith(`/dashboard/${teamKey}/lists/${id}`)) {
            router.push(`/dashboard/${teamKey}/lists`)
          }
        },
      },
    )
  }

  return (
    <DeleteModal
      title="Delete list"
      description="You are about to delete this list. It will also be removed from any associated deals. Are you sure you want to proceed?"
      isOpen={activeModal === "DeleteList"}
      onClose={closeModal}
      onDeleteClick={onDeleteClick}
      isPending={isPending}
    />
  )
}
