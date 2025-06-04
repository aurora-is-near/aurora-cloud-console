import { CommonProps } from "./types"

import { clsx } from "../clsx"

export type LabelProps = CommonProps<"span" | "strong" | "label"> & {
  size: 2 | 3 | 4
}

export const Label = ({
  as: Tag = "span",
  children,
  size,
  className,
  ...props
}: LabelProps) => {
  return (
    <Tag
      {...props}
      className={clsx(
        "font-medium",
        {
          "text-xs": size === 4,
          "text-sm": size === 3,
          "text-base": size === 2,
        },
        className,
      )}
    >
      {children}
    </Tag>
  )
}
