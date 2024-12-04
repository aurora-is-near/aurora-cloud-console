import React from "react"

import { Spinner } from "@/components/icons"

import { clsx } from "../clsx"
import { Typography } from "../Typography"

type Props = {
  message?: string
  className?: string
}

export const Loading = ({ message = "Loading...", className }: Props) => (
  <div className={clsx("flex items-center gap-2", className)}>
    <Spinner className="w-5 h-5 animate-spin" />
    <Typography variant="label" size={3} className="text-slate-500">
      {message}
    </Typography>
  </div>
)
