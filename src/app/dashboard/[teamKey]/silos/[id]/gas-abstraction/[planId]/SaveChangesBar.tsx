"use client"

import { CheckIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import { formatDateAndTime } from "@/utils/helpers"

export const SaveChangesBar = () => {
  const { clearPendingUpdates, deal, hasPendingUpdates, isUpdating } =
    useRequiredContext(DealUpdateContext)

  return (
    <div className="inset-x-0 bottom-0 bg-white px-8 py-5 flex items-center justify-between border-t">
      <Button
        disabled={!hasPendingUpdates || isUpdating}
        variant="secondary"
        onClick={clearPendingUpdates}
      >
        Reset
      </Button>
      {!!deal?.updatedAt && (
        <div className="text-sm text-gray-500">
          Last update: {formatDateAndTime(deal.updatedAt)}
        </div>
      )}
      <Button type="submit" disabled={!hasPendingUpdates} loading={isUpdating}>
        <CheckIcon className="w-5 h-5" />
        Save changes
      </Button>
    </div>
  )
}
