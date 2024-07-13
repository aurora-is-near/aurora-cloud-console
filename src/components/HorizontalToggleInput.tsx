import { FieldErrors } from "react-hook-form"
import { HorizontalInputWrapper } from "@/components/HorizontalInputWrapper"
import { ToggleInput, ToggleInputProps } from "@/components/ToggleInput"

type HorizontalToggleInputProps<Inputs extends Record<string, unknown>> =
  ToggleInputProps<Inputs> & {
    label: string
    errors?: FieldErrors<Inputs>
    className?: string
  }

export const HorizontalToggleInput = <Inputs extends Record<string, unknown>>({
  id,
  name,
  className,
  label,
  register,
  registerOptions,
  errors,
  ...restProps
}: HorizontalToggleInputProps<Inputs>) => (
  <HorizontalInputWrapper
    id={id}
    inputName={name}
    label={label}
    errors={errors}
    className={className}
  >
    <ToggleInput
      id={id}
      name={name}
      register={register}
      registerOptions={registerOptions}
      {...restProps}
    />
  </HorizontalInputWrapper>
)
