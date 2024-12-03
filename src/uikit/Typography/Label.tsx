import React from "react"

import { CommonProps } from "./types"

import { clsx } from '../clsx'

export type LabelProps = CommonProps<"span" | "strong" | "label"> & {
  size: 2 | 3
}

export const Label = ({
  as: Tag = "span",
  children,
  size,
  className,
  ...props
}: LabelProps) => {
  switch (size) {
    case 3:
      return (
        <Tag {...props} className={clsx("text-sm font-medium", className)}>
          {children}
        </Tag>
      )
    case 2:
    default:
      return (
        <Tag {...props} className={clsx("text-base font-medium", className)}>
          {children}
        </Tag>
      )
  }
}
