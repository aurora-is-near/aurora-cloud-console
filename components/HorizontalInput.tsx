import { HorizontalInputWrapper } from "@/components/HorizontalInputWrapper"
import { Input, InputProps } from "@/components/Input"
import { FieldErrors } from "react-hook-form"

type HorizontalInputProps<Inputs extends Record<string, unknown>> =
  InputProps<Inputs> & {
    label: string
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
  ...restProps
}: HorizontalInputProps<Inputs>) => (
  <HorizontalInputWrapper
    id={id}
    inputName={name}
    label={label}
    errors={errors}
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
