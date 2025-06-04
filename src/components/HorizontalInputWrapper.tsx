import clsx from "clsx"
import { InputWrapper, InputWrapperProps } from "@/components/InputWrapper"

export const HorizontalInputWrapper = <Inputs extends Record<string, unknown>>({
  layout,
  className,
  ...restProps
}: InputWrapperProps<Inputs> & { layout?: "horizontal" | "vertical" }) => (
  <InputWrapper
    className={clsx("sm:grid min-h-9", className, {
      "grid-cols-2 gap-x-4": !!restProps.label,
    })}
    {...restProps}
  />
)
