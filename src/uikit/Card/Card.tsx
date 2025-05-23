import type { PropsWithChildren } from "react"

import { clsx } from "../clsx"

type Props = PropsWithChildren<{
  tag?: keyof JSX.IntrinsicElements
  className?: string
  noPadding?: boolean
  testID?: string
}>

export const Card = ({
  tag: Tag = "div",
  noPadding,
  children,
  className,
  testID,
}: Props) => (
  <Tag
    className={clsx(
      "w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-[10px]",
      !noPadding && "p-5 md:p-6",
      className,
    )}
    data-testid={testID}
  >
    {children}
  </Tag>
)
