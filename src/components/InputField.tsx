import { FieldErrors } from "react-hook-form"
import { InputWrapper } from "@/components/InputWrapper"
import { Input, InputProps } from "@/components/Input"

type Props<Inputs extends Record<string, unknown>> = InputProps<Inputs> & {
  label?: string
  errors?: FieldErrors<Inputs>
}

export const InputField = <Inputs extends Record<string, unknown>>({
  id,
  name,
  className,
  label,
  register,
  registerOptions,
  errors,
  ...restProps
}: Props<Inputs>) => (
  <InputWrapper
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
  </InputWrapper>
)
