import clsx from "clsx"

export const getButtonClassName = (
  variant:
    | "primary"
    | "secondary"
    | "transparent"
    | "border"
    | "destructive"
    | "grey",
  size: "sm" | "md",
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
    "relative flex items-center justify-center rounded-md text-sm font-medium leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50",
    {
      "px-2.5 h-8": size === "sm",
      "px-3 h-9": size === "md",
      "shadow-sm": ["primary", "secondary"].includes(variant),
      "bg-green-500 text-gray-900 focus-visible:outline-green-500":
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
