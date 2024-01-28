"use client"

import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { AddOrEditListModal } from "./AddOrEditListModal"
import { useRouter } from "next/navigation"

export const AddListModal = () => {
  const { activeModal } = useModals()
  const getListsUpdater = useOptimisticUpdater("getLists")
  const router = useRouter()

  const { mutate: createList, isPending } = useMutation({
    mutationFn: apiClient.createList,
    onSuccess: ({ id }) => {
      router.push(`/lists/${id}`)
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
      isPending={isPending}
    />
  )
}
