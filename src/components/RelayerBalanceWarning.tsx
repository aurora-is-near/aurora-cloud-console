"use client"

import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import type { Silo } from "@/types/types"
import { Button } from "@/components/Button"

const NEAR_RELAYER_BALANCE_THRESHOLD = 5

export const RelayerBalanceWarning = ({ silo }: { silo: Silo }) => {
  const { openModal } = useModals()
  const txleft = 5 // This should be replaced with the actual transaction query value
  const handleTopUpClick = () => {
    if (silo) {
      openModal(Modals.TopUpOptions)
    }
  }

  if (!silo || NEAR_RELAYER_BALANCE_THRESHOLD > 5) {
    return null
  }

  return (
    <div className="bg-orange-600 text-slate-100 px-[14px] py-[10px]">
      <div className="flex items-center justify-center gap-2">
        <p className="text-sm text-center self-center flex-1 font-medium">
          You have {txleft} transactions left. Please top up for uninterrupted
          experience
        </p>
        <Button
          variant="transparent"
          onClick={handleTopUpClick}
          className="active:bg-transparent hover:bg-transparent text-slate-200 hover:text-slate-100 text-sm py-0 px-0 font-medium h-auto"
        >
          Top up now
          <ArrowRightIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
