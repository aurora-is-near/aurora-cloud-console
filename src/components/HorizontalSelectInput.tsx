import { HorizontalInputWrapper } from "@/components/HorizontalInputWrapper"
import { SelectInput, SelectInputProps } from "@/components/SelectInput"
import { FieldErrors } from "react-hook-form"

type HorizontalSelectInputProps<Inputs extends Record<string, unknown>> =
  SelectInputProps<Inputs> & {
    label: string
    errors?: FieldErrors<Inputs>
    className?: string
  }

export const HorizontalSelectInput = <Inputs extends Record<string, unknown>>({
  id,
  name,
  className,
  label,
  register,
  registerOptions,
  errors,
  ...restProps
}: HorizontalSelectInputProps<Inputs>) => (
  <HorizontalInputWrapper
    id={id}
    inputName={name}
    label={label}
    errors={errors}
    className={className}
  >
    <SelectInput
      id={id}
      name={name}
      register={register}
      registerOptions={registerOptions}
      {...restProps}
    />
  </HorizontalInputWrapper>
)
