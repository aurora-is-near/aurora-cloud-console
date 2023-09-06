"use client"

import { useState } from "react"
import { Switch } from "@headlessui/react"
import { Deal } from "@/types/types"
import clsx from "clsx"
import Button from "@/components/Button"

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)

const DealItem = ({ id, name, created_at }: Deal) => {
  const [enabled, setEnabled] = useState(false)

  return (
    <li className="p-5 sm:p-6 flex justify-between sm:items-center items-start gap-5">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={clsx(
          enabled ? "bg-green-500" : "bg-gray-200",
          "mt-2 sm:mt-0 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <div className="flex-1 flex items-start gap-y-3 sm:items-center justify-between sm:flex-row flex-col">
        <div>
          <h3>{name}</h3>
          <p className="text-sm text-gray-500">
            Created at {formatDate(new Date(created_at))}
          </p>
        </div>
        <Button href={`/borealis/deals/${id}`} style="border" size="sm">
          View
        </Button>
      </div>
    </li>
  )
}

export default DealItem
