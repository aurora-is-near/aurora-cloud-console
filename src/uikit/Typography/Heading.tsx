import { clsx } from "../clsx"

import { CommonProps } from "./types"

type HeadingHTMLTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type HeadingProps = CommonProps<HeadingHTMLTags> & {
  size: 3 | 4 | 5 | 6
}

export const Heading = ({
  as,
  children,
  size,
  className,
  ...props
}: HeadingProps) => {
  const Tag = as ?? `h${size}`

  return (
    <Tag
      {...props}
      className={clsx(
        "font-bold",
        {
          "font-bold text-xl tracking-tight leading-6": size === 3,
          "text-lg tracking-tight": size === 4,
          "text-4xl tracking-tighter": size === 5,
          "text-base": size === 6,
        },
        className,
      )}
    >
      {children}
    </Tag>
  )
}
