import { useId } from "react"

import { clsx } from "../clsx"
import type { HeroIcon } from "../types"

type Props = {
  icon: HeroIcon
  label: string
  onClick: () => void
  className?: string
  hasBorder?: boolean
  size?: "sm" | "md"
}

export const Iconed = ({
  label,
  icon: Icon,
  className,
  hasBorder = true,
  size = "sm",
  onClick,
}: Props) => {
  const id = useId()
  const containerClassName = clsx(
    "flex-shrink-0 rounded-lg",
    hasBorder && "border border-slate-400",
    size === "sm" ? "p-[7px]" : "p-2",
    className,
  )

  return (
    <button
      type="button"
      onClick={onClick}
      aria-labelledby={id}
      className={clsx(
        "text-slate-900 hover:bg-slate-100",
        containerClassName,
        className,
      )}
    >
      <span hidden id={id} className="sr-only">
        {label}
      </span>
      <Icon
        focusable="false"
        aria-hidden="true"
        className={size === "sm" ? "w-4 h-4" : "w-5 h-5"}
      />
    </button>
  )
}
