"use client"

import { Children, useMemo } from "react"

import { notReachable } from "@/utils/notReachable"

import { clsx } from "../clsx"
import { Label } from "../Label"
import { Typography } from "../Typography"

type ListItemProps = {
  label: string
  labelTooltip?: string
  className?: string
} & (
  | {
      plainTextValue: string
      children?: never
    }
  | {
      children: React.ReactNode
      plainTextValue?: never
    }
)

export const InfoListItem = ({
  label,
  labelTooltip,
  className,
  ...props
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
      {props.plainTextValue ? (
        <Typography variant="paragraph" size={4} className="text-slate-600">
          {props.plainTextValue}
        </Typography>
      ) : (
        props.children
      )}
    </td>
  </tr>
)
