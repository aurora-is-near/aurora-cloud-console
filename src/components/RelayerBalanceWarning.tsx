"use client"

import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Button } from "@/components/Button"
import {
  getEstimatedTransactionsLeft,
  useRelayerBalance,
} from "@/hooks/useRelayerBalance"
import { Silo } from "@/types/types"

const TRANSACTION_THRESHOLD = 5

export const RelayerBalanceWarning = ({ silo }: { silo: Silo }) => {
  const { openModal } = useModals()
  const { data: balanceData, isLoading, isError } = useRelayerBalance(silo)
  const txLeft = getEstimatedTransactionsLeft(balanceData?.near)

  const handleTopUpClick = () => {
    openModal(Modals.TopUpOptions)
  }

  // Only show warning when:
  // 1. Silo exists
  // 2. Data is loaded
  // 3. Transactions left are below threshold
  if (isLoading || isError || txLeft > TRANSACTION_THRESHOLD) {
    return null
  }

  return (
    <div className="bg-orange-600 text-slate-100 px-[14px] py-[10px]">
      <div className="flex items-center justify-center gap-2">
        <p className="text-xs md:text-sm text-center self-center flex-1 font-medium">
          You have {txLeft} transactions left. Please top up for uninterrupted
          experience
        </p>
        <Button
          variant="transparent"
          onClick={handleTopUpClick}
          className="active:bg-transparent hover:bg-transparent text-slate-200 hover:text-slate-100 text-xs md:text-sm py-0 px-0 font-medium h-0"
        >
          Top up now
          <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>
    </div>
  )
}
