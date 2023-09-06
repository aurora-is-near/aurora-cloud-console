"use client"

import { ReactNode } from "react"
import clsx from "clsx"
import Link from "next/link"

const Button = ({
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
}: {
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
}) => {
  const spinner = (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <div
        className="w-4 h-4 border-2 border-current rounded-full animate-spin"
        style={{ borderRightColor: "transparent" }}
      />
    </div>
  )

  const classes = clsx(
    "relative justify-center rounded-md text-sm font-medium leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-80",
    {
      "px-2.5 py-[3px]": size === "sm",
      "px-3 py-1.5": size === "md",
      "shadow-sm": ["primary", "secondary"].includes(style),
      "bg-green-500 text-gray-900 hover:bg-green-400 focus-visible:outline-green-500":
        style === "primary",
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-600":
        style === "secondary",
      "bg-transparent hover:bg-gray-200 focus-visible:outline-gray-600":
        style === "transparent",
      "border border-gray-400 hover:border-gray-600 focus-visible:outline-gray-600":
        style === "border",
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
      <Link className={classes} href={href} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
      {...rest}
    >
      {content}
    </button>
  )
}

export default Button
