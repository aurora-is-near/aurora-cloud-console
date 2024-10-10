"use client"

import { ComponentProps, forwardRef } from "react"
import Link from "next/link"
import { ButtonContent } from "@/components/ButtonContent"
import { getButtonClassName } from "@/utils/buttons"
import { ButtonSize, ButtonVariant } from "@/types/buttons"

export type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  isExternal?: boolean
  href: string
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
      isExternal,
      href,
      ...restProps
    },
    ref,
  ) => {
    const isDisabled = !!disabled || loading
    const Component = isExternal ? "a" : Link

    return (
      <Component
        ref={ref}
        href={href}
        className={getButtonClassName(variant, size, {
          className,
          isDisabled,
          isFullWidth: fullWidth,
        })}
        {...restProps}
      >
        <ButtonContent fullWidth={fullWidth} isLoading={loading}>
          {children}
        </ButtonContent>
      </Component>
    )
  },
)

LinkButton.displayName = "LinkButton"
