"use client"

import {
  ComponentProps,
  forwardRef,
  MouseEventHandler,
  useCallback,
} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { paramCase } from "change-case"
import { ButtonContent } from "@/components/ButtonContent"
import { getButtonClassName } from "@/utils/buttons"
import { ButtonSize, ButtonVariant } from "@/types/buttons"
import { useAnalytics } from "@/hooks/useAnalytics"

export type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  isExternal?: boolean
  isSquare?: boolean
  trackEventName?: string
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
      isSquare,
      trackEventName,
      href,
      ...restProps
    },
    ref,
  ) => {
    const isDisabled = !!disabled || loading
    const Component = isExternal ? "a" : Link
    const analytics = useAnalytics()
    const router = useRouter()

    const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
      (evt) => {
        if (!trackEventName || !analytics) {
          return
        }

        evt.preventDefault()
        analytics.track(paramCase(trackEventName))

        if (isExternal) {
          window.location.href = href

          return
        }

        router.push(href)
      },
      [analytics, href, isExternal, trackEventName, router],
    )

    return (
      <Component
        ref={ref}
        href={href}
        onClick={onClick}
        className={getButtonClassName(variant, size, {
          className,
          isDisabled,
          isFullWidth: fullWidth,
          isSquare,
        })}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
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
