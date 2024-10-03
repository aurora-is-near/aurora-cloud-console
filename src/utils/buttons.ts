import clsx from "clsx"
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react"

export const getButtonClassName = (
  variant:
    | "primary"
    | "secondary"
    | "transparent"
    | "border"
    | "destructive"
    | "grey",
  size: "sm" | "md" | "lg",
  {
    className,
    isDisabled,
    isFullWidth,
  }: {
    className?: string
    isDisabled?: boolean
    isFullWidth?: boolean
  } = {},
) =>
  clsx(
    "relative flex items-center justify-center rounded-lg font-medium leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 whitespace-nowrap",
    {
      "px-2.5 h-8 text-sm": size === "sm",
      "px-3 h-9 text-sm": size === "md",
      "px-4 h-10 text-base": size === "lg",
      "shadow-sm": ["primary", "secondary"].includes(variant),
      "bg-green-400 text-slate-900 focus-visible:outline-green-400":
        variant === "primary",
      "bg-gray-200 text-gray-900 focus-visible:outline-gray-600":
        variant === "secondary",
      "bg-transparent focus-visible:outline-gray-600":
        variant === "transparent",
      "border border-gray-400 focus-visible:outline-gray-600":
        variant === "border",
      "bg-rose-500 text-white focus-visible:outline-rose-500":
        variant === "destructive",
      "bg-slate-200 text-slate-500": variant === "grey",
      "hover:bg-green-400": variant === "primary" && !isDisabled,
      "hover:bg-gray-300": variant === "secondary" && !isDisabled,
      "hover:bg-gray-200": variant === "transparent" && !isDisabled,
      "hover:border-gray-600": variant === "border" && !isDisabled,
      "hover:bg-rose-600": variant === "destructive" && !isDisabled,
      "w-full": isFullWidth,
    },
    className,
  )

export const generateIcon = (icon: ReactNode, className: string) => {
  return isValidElement(icon)
    ? cloneElement(icon as ReactElement, {
        className,
        "aria-hidden": true,
      })
    : null
}
