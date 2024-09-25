import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form"

export type AuthInputProps<Inputs extends Record<string, unknown>> =
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    id: string
    name: Path<Inputs>
    label: string
    className?: string
    register?: UseFormRegister<Inputs>
    registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
  }

export const AuthInput = <Inputs extends Record<string, unknown>>({
  id,
  name,
  label,
  className,
  register,
  registerOptions,
  ...restProps
}: AuthInputProps<Inputs>) => (
  <div className={className}>
    <label
      htmlFor={id}
      className="block text-sm font-medium leading-6 text-white"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
        {...restProps}
        {...register?.(name, registerOptions)}
      />
    </div>
  </div>
)
