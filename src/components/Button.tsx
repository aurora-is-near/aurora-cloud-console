"use client"

import { ButtonHTMLAttributes, forwardRef } from "react"
import { ButtonContent } from "@/components/ButtonContent"
import { getButtonClassName } from "@/utils/buttons"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "transparent"
    | "border"
    | "destructive"
    | "grey"
    | "dark"
  size?: "sm" | "md" | "lg" | "xl"
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, Props>(
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
    const isDisabled = !!disabled || loading

    return (
      <button
        type="button"
        className={getButtonClassName(variant, size, {
          className,
          isDisabled,
          isFullWidth: fullWidth,
        })}
        disabled={isDisabled}
        ref={ref}
        {...restProps}
      >
        <ButtonContent fullWidth={fullWidth} isLoading={loading}>
          {children}
        </ButtonContent>
      </button>
    )
  },
)

Button.displayName = "Button"
