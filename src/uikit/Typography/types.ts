import type { PropsWithChildren } from "react"

export type CommonProps<A extends keyof JSX.IntrinsicElements> =
  PropsWithChildren<
    {
      as?: A
      className?: string
    } & Omit<JSX.IntrinsicElements[A], "ref">
  >
