import { FieldErrors } from "react-hook-form"
import { HorizontalInputWrapper } from "@/components/HorizontalInputWrapper"
import { Input, InputProps } from "@/components/Input"

type HorizontalInputProps<Inputs extends Record<string, unknown>> =
  InputProps<Inputs> & {
    label?: string
    layout?: "horizontal" | "vertical"
    errors?: FieldErrors<Inputs>
  }

export const HorizontalInput = <Inputs extends Record<string, unknown>>({
  id,
  name,
  className,
  label,
  register,
  registerOptions,
  errors,
  layout = "horizontal",
  ...restProps
}: HorizontalInputProps<Inputs>) => (
  <HorizontalInputWrapper
    id={id}
    inputName={name}
    label={label}
    errors={errors}
    layout={layout}
    className={className}
  >
    <Input
      id={id}
      name={name}
      register={register}
      registerOptions={registerOptions}
      {...restProps}
    />
  </HorizontalInputWrapper>
)
