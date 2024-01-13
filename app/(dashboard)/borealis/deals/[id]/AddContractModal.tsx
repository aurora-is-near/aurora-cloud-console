"use client"

import { useMutation } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import AddOrEditContractModal, {
  type AddOrEditContractModalInputs,
} from "./AddOrEditContractModal"

const AddContractModal = () => {
  const { id } = useParams()
  const { activeModal, closeModal } = useModals()

  const contractsUpdater = useOptimisticUpdater("getDealContracts")
  const { mutate: addContract } = useMutation({
    mutationFn: apiClient.addDealContract,
    onSettled: contractsUpdater.invalidate,
    onSuccess: closeModal,
  })

  const onSubmit = (data: AddOrEditContractModalInputs) => {
    addContract({ id: Number(id), ...data })
  }

  return (
    <AddOrEditContractModal
      open={activeModal === Modals.AddContract}
      onSubmit={onSubmit}
    />
  )
}

export default AddContractModal
