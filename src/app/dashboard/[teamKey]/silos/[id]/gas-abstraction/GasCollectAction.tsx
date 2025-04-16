import { useState } from "react"
import { parseUnits } from "ethers"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { logger } from "@/logger"
import { Button } from "@/components/Button"
import { collectGas } from "@/actions/silo-gas/collect-gas"
import { safeBigintToNumber } from "@/utils/safe-bigint-to-number"
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

  const parsedGasPrice = parseUnits(`${availableGas}`, silo.base_token_decimals)
  let parsedGasSafeAmount: number = 0

  try {
    parsedGasSafeAmount = safeBigintToNumber(parsedGasPrice)
  } catch (e: unknown) {
    throw new Error("Gas amount is too high")
  }

  try {
    const status = await collectGas({ silo, amount: `${parsedGasSafeAmount}` })

    if (status === "FAILED") {
      throw new Error("Gas collection failed")
    }
  } catch (e: unknown) {
    throw new Error("Gas collection failed")
  }
}

export const GasCollectAction = ({ silo, availableGas }: Props) => {
  const queryClient = useQueryClient()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const collectGasMutation = useMutation({
    mutationFn: () => collectGasMutationFn({ silo, availableGas }),
  })

  const onConfirm = () => {
    collectGasMutation
      .mutateAsync()
      .then(() => {
        setIsConfirmModalOpen(false)
        void queryClient.invalidateQueries({
          queryKey: ["getSiloCollectedGasTotal"],
        })
      })
      .catch((e) => {
        logger.error(e)
        toast.error("Gas collection failed")
      })
  }

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
        onConfirm={onConfirm}
      />
    </>
  )
}
