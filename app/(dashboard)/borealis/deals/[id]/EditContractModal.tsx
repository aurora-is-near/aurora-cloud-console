"use client"

import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { useMutation, useQuery } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import AddOrEditContractModal, {
  type AddOrEditContractModalInputs,
} from "./AddOrEditContractModal"
import { useQueryState } from "next-usequerystate"
import { useParams } from "next/navigation"
import { getQueryFnAndKey } from "@/utils/api/queries"

const EditContractModal = () => {
  const { activeModal, closeModal } = useModals()
  const [id, setId] = useQueryState("id")
  const { id: dealId } = useParams()
  const isOpen = activeModal === Modals.EditContract
  const contractParams = {
    id: Number(dealId),
    contractId: Number(id),
  }

  const { data: contract } = useQuery({
    ...getQueryFnAndKey("getDealContract", contractParams),
    enabled: !!(id && dealId),
  })

  const contractUpdater = useOptimisticUpdater(
    "getDealContract",
    contractParams,
  )

  const contractsUpdater = useOptimisticUpdater("getDealContracts")

  const { mutate: updateDealContract } = useMutation({
    mutationFn: apiClient.updateDealContract,
    onMutate: contractUpdater.update,
    onSuccess: closeModal,
    onSettled: () => {
      contractUpdater.invalidate()
      contractsUpdater.invalidate()
    },
  })

  const onSubmit = async (data: AddOrEditContractModalInputs) => {
    updateDealContract({
      id: Number(dealId),
      contractId: Number(id),
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
