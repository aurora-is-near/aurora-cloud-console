import React from "react"

import { clsx } from '../clsx'

import { CommonProps } from "./types"

export type ParagraphProps = CommonProps<"p" | "span"> & {
  size: 2 | 4
}

export const Paragraph = ({
  as: Tag = "p",
  children,
  size,
  className,
  ...props
}: ParagraphProps) => {
  switch (size) {
    case 2:
      return (
        <Tag
          {...props}
          className={clsx(
            "text-lg leading-relaxed tracking-tight font-medium",
            className,
          )}
        >
          {children}
        </Tag>
      )
    case 4:
    default:
      return (
        <Tag {...props} className={clsx("text-sm", className)}>
          {children}
        </Tag>
      )
  }
}
