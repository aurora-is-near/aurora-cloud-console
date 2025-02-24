import { clsx } from "../clsx"

import type { CommonProps } from "./types"

export type ParagraphProps = CommonProps<"p" | "span"> & {
  size: 1 | 4 | 5
}

export const Paragraph = ({
  as: Tag = "p",
  children,
  size,
  className,
  ...props
}: ParagraphProps) => {
  return (
    <Tag
      {...props}
      className={clsx(
        {
          "text-lg leading-relaxed tracking-tight font-medium": size === 1,
          "text-sm": size === 4,
          "text-xs": size === 5,
        },
        className,
      )}
    >
      {children}
    </Tag>
  )
}
