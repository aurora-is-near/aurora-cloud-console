"use client"

import { Switch } from "@headlessui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import clsx from "clsx"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { getQueryFnAndKey } from "@/utils/api/queries"

const ToggleDeal = ({ dealId }: { dealId: number }) => {
  const { data: deal } = useQuery(getQueryFnAndKey("getDeal", { id: dealId }))

  const dealUpdater = useOptimisticUpdater("getDeal", {
    id: dealId,
  })

  const { mutate: enableDeal } = useMutation({
    mutationFn: apiClient.updateDeal,
    onSettled: dealUpdater.invalidate,
    onMutate: dealUpdater.update,
  })

  const onChange = (enabled: boolean) => {
    enableDeal({ id: dealId, enabled })
  }

  const isDealEnabled = !!deal?.enabled

  return (
    <Switch
      checked={isDealEnabled}
      onChange={onChange}
      className={clsx(
        isDealEnabled ? "bg-green-500" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
      )}
    >
      <span className="sr-only">
        Switch deal {isDealEnabled ? "off" : "on"}
      </span>
      <span
        aria-hidden="true"
        className={clsx(
          isDealEnabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
  )
}

export default ToggleDeal
