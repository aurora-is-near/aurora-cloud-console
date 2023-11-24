"use client"

import { Modals, useModals } from "@/hooks/useModals"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import AddOrEditContractModal, {
  type AddOrEditContractModalInputs,
} from "./AddOrEditContractModal"
import { useParams } from "next/navigation"

const AddContractModal = () => {
  const { id } = useParams()
  const { activeModal, closeModal } = useModals()

  const dealsUpdater = useOptimisticUpdater("getDeals")
  const { mutate: addContract } = useMutation({
    mutationFn: apiClient.addContract,
    onSettled: dealsUpdater.invalidate,
    onSuccess: closeModal,
  })

  const onSubmit = (data: AddOrEditContractModalInputs) => {
    addContract({ deal_id: Number(id), ...data })
  }

  return (
    <AddOrEditContractModal
      open={activeModal === Modals.AddContract}
      onSubmit={onSubmit}
    />
  )
}

export default AddContractModal
