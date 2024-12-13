import { Skeleton } from "./Skeleton"

import { clsx } from "../clsx"

type Props = {
  numberOfRows?: number
  className?: string
}

export const SkeletonTable = ({ numberOfRows = 3, className }: Props) => (
  <Skeleton className={clsx("divide-y rounded-lg h-auto", className)}>
    <div className="h-[42.5px]" />
    {Array.from({ length: numberOfRows }, (_, index) => (
      <div key={index} className="h-[53px]" />
    ))}
  </Skeleton>
)
