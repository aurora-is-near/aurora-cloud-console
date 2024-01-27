"use client"

import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { AddOrEditListModal } from "./AddOrEditListModal"

export const AddListModal = () => {
  const { activeModal, closeModal } = useModals()
  const getListsUpdater = useOptimisticUpdater("getLists")

  const { mutate: createList } = useMutation({
    mutationFn: apiClient.createList,
    onSuccess: (data) => {
      closeModal()
      getListsUpdater.insert(data)
    },
    onSettled: getListsUpdater.invalidate,
  })

  const onSubmit = async (data: { name: string }) => {
    createList(data)
  }

  return (
    <AddOrEditListModal
      open={activeModal === Modals.AddList}
      onSubmit={onSubmit}
    />
  )
}
