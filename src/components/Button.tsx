import { ButtonHTMLAttributes, forwardRef } from "react"
import { ButtonContent } from "@/components/ButtonContent"
import { getButtonClassName } from "@/utils/buttons"
import { ButtonSize, ButtonVariant } from "@/types/buttons"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  isSquare?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      title,
      loading,
      disabled,
      fullWidth,
      isSquare,
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
          isSquare,
        })}
        disabled={isDisabled}
        ref={ref}
        {...restProps}
      >
        <ButtonContent fullWidth={fullWidth} isLoading={loading}>
          {children ?? title}
        </ButtonContent>
      </button>
    )
  },
)

Button.displayName = "Button"
