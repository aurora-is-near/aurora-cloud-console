"use client"

import { useMutation } from "@tanstack/react-query"
import { useModals } from "@/hooks/useModals"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { AddOrEditListModal } from "./AddOrEditListModal"

export const AddListModal = () => {
  const { activeModal, closeModal } = useModals()
  const getListsUpdater = useOptimisticUpdater("getLists")

  const { mutate: createList, isPending } = useMutation({
    mutationFn: apiClient.createList,
    onSuccess: closeModal,
    onSettled: getListsUpdater.invalidate,
  })

  const onSubmit = async (data: { name: string }) => {
    createList(data)
  }

  return (
    <AddOrEditListModal
      open={activeModal === "AddList"}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  )
}
