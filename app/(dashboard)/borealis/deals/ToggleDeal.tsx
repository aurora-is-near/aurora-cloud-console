"use client"

import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { useApiQuery } from "@/utils/api/queries"
import { Switch } from "@headlessui/react"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import React from "react"

const ToggleDeal = ({ dealId }: { dealId: number }) => {
  const { data: deal } = useApiQuery("getDeal", { params: { id: dealId } })
  const dealUpdater = useOptimisticUpdater("getDeal", { id: dealId })
  const dealsUpdater = useOptimisticUpdater("getDeals")

  const { mutate: toggleDeal } = useMutation({
    mutationFn: apiClient.toggleDeal,
    onMutate: (variables) => {
      dealUpdater.update({ enabled: variables.enabled })
    },
    onSettled: dealsUpdater.invalidate,
  })

  const onChange = (enabled: boolean) => {
    toggleDeal({ id: dealId, enabled })
  }

  const isEnabled = !!deal?.enabled

  return (
    <Switch
      checked={isEnabled}
      onChange={onChange}
      className={clsx(
        isEnabled ? "bg-green-500" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
      )}
    >
      <span className="sr-only">Switch deal {isEnabled ? "off" : "on"}</span>
      <span
        aria-hidden="true"
        className={clsx(
          isEnabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
  )
}

export default ToggleDeal
