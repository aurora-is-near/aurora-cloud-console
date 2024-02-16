import { InputWrapper, InputWrapperProps } from "@/components/InputWrapper"
import clsx from "clsx"

export const HorizontalInputWrapper = <Inputs extends Record<string, unknown>>({
  className,
  ...restProps
}: InputWrapperProps<Inputs>) => (
  <InputWrapper
    className={clsx("sm:grid sm:grid-cols-2 min-h-9", className)}
    {...restProps}
  />
)
