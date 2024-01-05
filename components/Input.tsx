import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import {
  FieldErrors,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form"

export type InputProps<Inputs extends Record<string, unknown>> =
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    id: string
    name: Path<Inputs>
    className?: string
    register?: UseFormRegister<Inputs>
    registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
    errors?: FieldErrors<Inputs>
  }

export const Input = <Inputs extends Record<string, unknown>>({
  name,
  className,
  register,
  registerOptions,
  errors,
  ...restProps
}: InputProps<Inputs>) => (
  <input
    name={name}
    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
    {...restProps}
    {...register?.(name, registerOptions)}
  />
)
