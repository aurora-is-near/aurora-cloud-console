import clsx from "clsx"
import { InputWrapper, InputWrapperProps } from "@/components/InputWrapper"

export const HorizontalInputWrapper = <Inputs extends Record<string, unknown>>({
  className,
  ...restProps
}: InputWrapperProps<Inputs>) => (
  <InputWrapper
    className={clsx("sm:grid min-h-9", className, {
      "grid-cols-2 gap-x-4": restProps.label,
      "grid-cols-1": !restProps.label,
    })}
    {...restProps}
  />
)
