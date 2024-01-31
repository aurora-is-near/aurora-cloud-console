"use client"

import Button from "@/components/Button"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealContext } from "@/providers/DealUpdateProvider"
import { formatDateAndTime } from "@/utils/helpers"
import { CheckIcon } from "@heroicons/react/20/solid"

export const SaveChangesBar = () => {
  const { resetDeal, deal } = useRequiredContext(DealContext)

  return (
    <div className="inset-x-0 bottom-0 bg-white px-8 py-5 flex items-center justify-between border-t">
      <Button style="secondary" onClick={resetDeal}>
        Reset
      </Button>
      {deal?.updated_at && (
        <div className="text-sm text-gray-500">
          Last update: {formatDateAndTime(deal.updated_at)}
        </div>
      )}
      <Button>
        <CheckIcon className="w-5 h-5" />
        Save changes
      </Button>
    </div>
  )
}
