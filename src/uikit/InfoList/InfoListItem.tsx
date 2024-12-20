"use client"

import { Children, useMemo } from "react"

import { notReachable } from "@/utils/notReachable"

import { clsx } from "../clsx"
import { Label } from "../Label"
import { Typography } from "../Typography"

type ListItemProps = {
  label: string
  labelTooltip?: string
  children: React.ReactNode
  className?: string
}

export const InfoListItem = ({
  label,
  labelTooltip,
  children,
  className,
}: ListItemProps) => (
  <tr
    className={clsx(
      "border-b border-slate-200 last:border-transparent",
      className,
    )}
  >
    <td className="py-4">
      <Label tooltip={labelTooltip} className="flex-none mr-10 min-w-[180px]">
        {label}
      </Label>
    </td>
    <td className="py-4">
      {typeof children === "string" ? (
        <Typography variant="paragraph" size={4} className="text-slate-600">
          {children}
        </Typography>
      ) : (
        children
      )}
    </td>
  </tr>
)
