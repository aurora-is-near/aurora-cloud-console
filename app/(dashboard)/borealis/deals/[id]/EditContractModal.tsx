"use client"

import { Modals, useModals } from "@/hooks/useModals"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import AddOrEditContractModal, {
  type AddOrEditContractModalInputs,
} from "./AddOrEditContractModal"
import { useQueryState } from "next-usequerystate"
import { useContract } from "@/utils/api/queries"

const EditContractModal = () => {
  const { activeModal, closeModal } = useModals()
  const [id, setId] = useQueryState("id")
  const isOpen = activeModal === Modals.EditContract
  const contractParams = { id: id ? Number(id) : undefined }
  const { data: contract } = useContract(contractParams)

  const dealUpdater = useOptimisticUpdater("getDeal", contractParams)
  const dealsUpdater = useOptimisticUpdater("getDeals")

  const { mutate: updateContract } = useMutation({
    mutationFn: apiClient.updateContract,
    onMutate: dealUpdater.update,
    onSuccess: closeModal,
    onSettled: () => {
      dealUpdater.invalidate()
      dealsUpdater.invalidate()
    },
  })

  const onSubmit = async (data: AddOrEditContractModalInputs) => {
    updateContract({
      id: Number(id),
      ...data,
    })
  }

  return (
    <AddOrEditContractModal
      open={isOpen}
      values={contract}
      onSubmit={onSubmit}
      afterLeave={() => {
        setId(null)
      }}
    />
  )
}

export default EditContractModal
