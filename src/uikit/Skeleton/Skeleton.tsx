import { clsx } from "../clsx"

type Props = {
  className?: string
}

export const Skeleton = ({ className }: Props) => {
  return (
    <div
      className={clsx(
        "h-6 w-full bg-slate-100 rounded-full animate-pulse",
        className,
      )}
    />
  )
}
