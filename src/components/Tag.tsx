import clsx from "clsx"
import { ComponentType } from "react"

type TagProps = {
  text: string
  color: "cyan" | "green" | "orange"
  Icon?: ComponentType<{ className?: string }>
  size?: "sm" | "md"
}

export const Tag = ({ text, color, Icon, size = "md" }: TagProps) => (
  <span
    className={clsx(
      "rounded-md px-2 py-1 whitespace-nowrap font-medium inline-flex flex-row items-center",
      {
        "bg-cyan-100 text-slate-900": color === "cyan",
        "bg-green-200 text-green-700": color === "green",
        "bg-orange-200 text-orange-700": color === "orange",
        "text-xs": size === "sm",
        "text-sm": size === "md",
      },
    )}
  >
    {Icon && <Icon className="w-4 h-4 mr-1 inline-block" />}
    {text}
  </span>
)
