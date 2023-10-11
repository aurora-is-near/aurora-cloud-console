"use client"

import { ReactNode, forwardRef } from "react"
import clsx from "clsx"
import Link from "next/link"

type Props = {
  style?: "primary" | "secondary" | "transparent" | "border"
  size?: "sm" | "md"
  className?: string
  children: ReactNode
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  href?: string
  [rest: string]: any
}

type Ref = HTMLButtonElement | HTMLAnchorElement

const Button = forwardRef<Ref, Props>(
  (
    {
      style = "primary",
      size = "md",
      className,
      children,
      loading,
      disabled,
      fullWidth,
      onClick,
      href,
      ...rest
    },
    ref
  ) => {
    const spinner = (
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <div
          className="w-4 h-4 border-2 border-current rounded-full animate-spin"
          style={{ borderRightColor: "transparent" }}
        />
      </div>
    )

    const classes = clsx(
      "relative flex items-center justify-center rounded-md text-sm font-medium leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50",
      {
        "px-2.5 h-8": size === "sm",
        "px-3 h-9": size === "md",
        "shadow-sm": ["primary", "secondary"].includes(style),
        "bg-green-500 text-gray-900 focus-visible:outline-green-500":
          style === "primary",
        "bg-gray-200 text-gray-900 focus-visible:outline-gray-600":
          style === "secondary",
        "bg-transparent focus-visible:outline-gray-600":
          style === "transparent",
        "border border-gray-400 focus-visible:outline-gray-600":
          style === "border",
        "hover:bg-green-400": style === "primary" && !disabled,
        "hover:bg-gray-300": style === "secondary" && !disabled,
        "hover:bg-gray-200": style === "transparent" && !disabled,
        "hover:border-gray-600": style === "border" && !disabled,
        "w-full": fullWidth,
      },
      className
    )

    const content = (
      <>
        <span
          className={clsx("flex items-center justify-center gap-2", {
            "opacity-0": loading,
          })}
        >
          {children}
        </span>
        {loading && spinner}
      </>
    )

    if (href) {
      return (
        <Link
          className={classes}
          href={href}
          {...rest}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </Link>
      )
    }

    return (
      <button
        onClick={onClick}
        className={classes}
        disabled={disabled || loading}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...rest}
      >
        {content}
      </button>
    )
  }
)
Button.displayName = "Button"

export default Button
