import type { PropsWithChildren } from "react"

import { clsx } from "../clsx"

type Props = PropsWithChildren<{
  tag?: keyof JSX.IntrinsicElements
  className?: string
}>

export const Card = ({ tag: Tag = "div", children, className }: Props) => (
  <Tag
    className={clsx(
      "w-full bg-white p-5 md:p-6 border border-slate-200 shadow-sm rounded-[10px]",
      className,
    )}
  >
    {children}
  </Tag>
)
