"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useModals } from "@/hooks/useModals"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { AddOrEditListModal } from "./AddOrEditListModal"

type EditListModalProps = {
  teamKey: string
  id: number
}

export const EditListModal = ({ teamKey, id }: EditListModalProps) => {
  const { activeModal, openModal, closeModal } = useModals()
  const isOpen = activeModal === "EditList"

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
      id,
      ...data,
    })
  }

  const onDelete = () => {
    if (!id) {
      throw new Error("An id is required to open the delete list modal")
    }

    openModal("DeleteList", { teamKey, id })
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
      onDelete={onDelete}
      isPending={isPending}
    />
  )
}
