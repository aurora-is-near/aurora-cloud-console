"use client"

import { Switch } from "@headlessui/react"
import clsx from "clsx"
import React, { useState } from "react"

const ToggleDeal = ({ dealId }: { dealId: string }) => {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={clsx(
        enabled ? "bg-green-500" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
      )}
    >
      <span className="sr-only">Switch deal {enabled ? "off" : "on"}</span>
      <span
        aria-hidden="true"
        className={clsx(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </Switch>
  )
}

export default ToggleDeal
