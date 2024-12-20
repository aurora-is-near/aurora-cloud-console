import { clsx } from "../clsx"

import { CommonProps } from "./types"

export type ParagraphProps = CommonProps<"p" | "span"> & {
  size: 2 | 3 | 4
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
          "text-lg leading-relaxed tracking-tight font-medium": size === 2,
          "text-sm": size === 4,
        },
        className,
      )}
    >
      {children}
    </Tag>
  )
}
