import { Skeleton } from "./Skeleton"

import { clsx } from "../clsx"

type Props = {
  numberOfItems?: number
  className?: string
}

export const SkeletonList = ({ numberOfItems = 3, className }: Props) => (
  <div className={clsx("flex flex-col gap-2", className)}>
    {Array.from({ length: numberOfItems }, (_, index) => (
      <Skeleton
        key={index}
        className="sm:h-[52px] md:h-[56px] h-[72px] rounded-sm"
      />
    ))}
  </div>
)
