import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import {
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form"

type HorizontalInputProps<Inputs extends Record<string, unknown>> =
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label: string
    id: string
    name: Path<Inputs>
    className?: string
    register?: UseFormRegister<Inputs>
    registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
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
  <div className="sm:grid sm:grid-cols-2 min-h-9">
    <label
      htmlFor={id}
      className="py-1.5 block text-sm font-medium leading-none text-gray-500"
    >
      {label}
    </label>
    <div className="w-full">
      <input
        id={id}
        name={name}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
        {...restProps}
        {...register?.(name, registerOptions)}
      />
      {!!errors?.[name]?.message && (
        <p className="mt-1.5 text-sm font-medium text-red-500">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  </div>
)
