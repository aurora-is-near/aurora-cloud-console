"use client"

import { Switch } from "@headlessui/react"
import clsx from "clsx"
import { ComponentProps } from "react"

export const Toggle = ({
  checked,
  className,
  ...restProps
}: ComponentProps<typeof Switch>) => {
  return (
    <Switch
      {...restProps}
      checked={checked}
      className={clsx(
        checked ? "bg-green-500" : "bg-slate-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
        className,
      )}
    >
      <span className="sr-only">Toggle {checked ? "off" : "on"}</span>
      <span
        aria-hidden="true"
        className={clsx(
          checked ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </Switch>
  )
}
