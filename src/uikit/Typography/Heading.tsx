import { clsx } from "../clsx"

import { CommonProps } from "./types"

type HeadingHTMLTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type HeadingProps = CommonProps<HeadingHTMLTags> & {
  size: 5 | 6
}

export const Heading = ({
  as,
  children,
  size,
  className,
  ...props
}: HeadingProps) => {
  const Tag = as ?? `h${size}`

  switch (size) {
    case 5:
      return (
        <Tag
          {...props}
          className={clsx("text-4xl font-bold tracking-tighter", className)}
        >
          {children}
        </Tag>
      )
    case 6:
    default:
      return (
        <Tag {...props} className={clsx("text-base font-bold", className)}>
          {children}
        </Tag>
      )
  }
}
