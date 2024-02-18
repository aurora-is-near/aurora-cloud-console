"use client"

import { ComponentProps, forwardRef } from "react"
import { ButtonContent } from "@/components/ButtonContent"
import { getButtonClassName } from "@/utils/buttons"
import Link from "next/link"

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "transparent" | "border" | "destructive"
  size?: "sm" | "md"
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      loading,
      disabled,
      fullWidth,
      ...restProps
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <Link
        ref={ref}
        className={getButtonClassName(variant, size, {
          className,
          isDisabled,
          isFullWidth: fullWidth,
        })}
        {...restProps}
      >
        <ButtonContent isLoading={loading}>{children}</ButtonContent>
      </Link>
    )
  },
)

LinkButton.displayName = "LinkButton"
