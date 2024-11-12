import clsx from "clsx"
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react"
import { ButtonSize, ButtonVariant } from "@/types/buttons"

export const getButtonClassName = (
  variant: ButtonVariant,
  size: ButtonSize,
  {
    className,
    isDisabled,
    isFullWidth,
    isSquare,
  }: {
    className?: string
    isDisabled?: boolean
    isFullWidth?: boolean
    isSquare?: boolean
  } = {},
) =>
  clsx(
    "relative flex items-center justify-center rounded-lg font-medium leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 whitespace-nowrap transition-colors duration-200 select-none",
    {
      "px-2 p-1.5 h-8 max-h-8 text-sm": size === "sm",
      "w-8 max-w-8": size === "sm" && isSquare,
      "px-2.5 py-2 h-9 max-h-9 text-sm": size === "md",
      "w-9 max-w-9": size === "md" && isSquare,
      "px-3 py-3 h-12 max-h-12 text-base": size === "lg",
      "w-12 max-w-12": size === "lg" && isSquare,
      "px-4 py-4 md:py-6 h-12 max-h-12 md:h-16 md:max-h-16 text-base md:text-lg":
        size === "xl",
      "w-12 max-w-12 md:w-16 md:max-w-16": size === "xl" && isSquare,
      "shadow-sm": ["primary", "secondary"].includes(variant),
      "bg-green-400 text-slate-900 focus-visible:outline-green-400":
        variant === "primary",
      "bg-gray-200 text-gray-900 focus-visible:outline-gray-600":
        variant === "secondary",
      "bg-transparent focus-visible:outline-gray-600":
        variant === "transparent",
      "border border-slate-400 focus-visible:outline-slate-600":
        variant === "border",
      "bg-rose-500 text-white focus-visible:outline-rose-500":
        variant === "destructive",
      "bg-slate-900 text-slate-100": variant === "dark",
      "hover:bg-green-500": variant === "primary" && !isDisabled,
      "hover:bg-gray-300": variant === "secondary" && !isDisabled,
      "hover:bg-gray-200": variant === "transparent" && !isDisabled,
      "hover:border-slate-600": variant === "border" && !isDisabled,
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
