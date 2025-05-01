import { useState } from "react"
import { parseUnits } from "ethers"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { logger } from "@/logger"
import { getQueryKey } from "@/utils/api/query-keys"
import { Button } from "@/components/Button"
import { collectGasToNear } from "@/actions/silo-gas/collect-gas-to-near"
import type { Silo } from "@/types/types"

import { ConfirmGasCollectionModal } from "./ConfirmGasCollectionModal"

type Props = {
  silo: Silo
  availableGas: number
}

type MutationFnArgs = {
  silo: Silo
  availableGas: number
}

const collectGasMutationFn = async ({ silo, availableGas }: MutationFnArgs) => {
  if (availableGas === 0) {
    throw new Error("No gas available for collection")
  }

  const parsedGasAmount = parseUnits(
    `${availableGas}`,
    silo.base_token_decimals,
  )

  let status = "PENDING"

  try {
    status = await collectGasToNear({
      silo,
      amount: parsedGasAmount.toString(),
    })
  } catch (e: unknown) {
    throw new Error("Gas collection failed")
  }

  if (status === "FAILED") {
    throw new Error("Gas collection failed")
  }
}

export const GasCollectAction = ({ silo, availableGas }: Props) => {
  const queryClient = useQueryClient()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const collectGasMutation = useMutation({
    mutationFn: () => collectGasMutationFn({ silo, availableGas }),
    onSuccess: () => {
      setIsConfirmModalOpen(false)
      toast.success("Collected gas was sent to your account")
      void queryClient.invalidateQueries({
        queryKey: getQueryKey("getSiloCollectedGasTotal"),
      })
    },
    onError: (error) => {
      logger.error(error)
      toast.error(error.message)
    },
  })

  return (
    <>
      <Button
        size="sm"
        title="Collect"
        variant="border"
        disabled={!silo.gas_collection_address || availableGas === 0}
        onClick={() => setIsConfirmModalOpen(true)}
      />
      <ConfirmGasCollectionModal
        isOpen={isConfirmModalOpen}
        isLoading={collectGasMutation.isPending}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={collectGasMutation.mutate}
      />
    </>
  )
}
