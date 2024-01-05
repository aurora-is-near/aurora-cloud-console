import { DetailedHTMLProps, SelectHTMLAttributes } from "react"
import {
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form"

export type SelectInputProps<Inputs extends Record<string, unknown>> =
  DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & {
    id: string
    name: Path<Inputs>
    className?: string
    register?: UseFormRegister<Inputs>
    registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
    errors?: FieldErrors<Inputs>
    options: {
      label: string
      value: string
    }[]
  }

export const SelectInput = <Inputs extends Record<string, unknown>>({
  name,
  className,
  register,
  registerOptions,
  errors,
  options,
  ...restProps
}: SelectInputProps<Inputs>) => (
  <select
    {...restProps}
    {...restProps}
    {...register?.(name, registerOptions)}
    name={name}
    className="block w-full py-4 pl-3 pr-8 leading-none text-gray-900 border-0 rounded-md ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600"
  >
    {options.map(({ label, value }) => (
      <option key={label} value={value}>
        {label}
      </option>
    ))}
  </select>
)
