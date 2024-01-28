"use client"

import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useMutation, useQuery } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { useQueryState } from "next-usequerystate"
import { useMemo } from "react"
import { AddOrEditListModal } from "./AddOrEditListModal"
import { getQueryFnAndKey } from "@/utils/api/queries"

export const EditListModal = () => {
  const { activeModal, closeModal } = useModals()
  const [id] = useQueryState("id")
  const isOpen = activeModal === Modals.EditList
  const { data: list } = useQuery({
    ...getQueryFnAndKey("getList", { id: Number(id) }),
    enabled: !!id,
  })

  const getListUpdater = useOptimisticUpdater("getList", { id: Number(id) })
  const getListsUpdater = useOptimisticUpdater("getLists")

  const { mutate: updateList, isPending } = useMutation({
    mutationFn: apiClient.updateList,
    onMutate: getListUpdater.update,
    onSuccess: closeModal,
    onSettled: () => {
      getListUpdater.invalidate()
      getListsUpdater.invalidate()
    },
  })

  const onSubmit = async (data: { name: string }) => {
    updateList({
      id: Number(id),
      ...data,
    })
  }

  const values = useMemo(
    () => ({
      name: list?.name ?? "",
    }),
    [list],
  )

  return (
    <AddOrEditListModal
      open={isOpen}
      values={values}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  )
}
