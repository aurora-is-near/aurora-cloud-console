import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form"

export type AuthInputProps<Inputs extends Record<string, unknown>> =
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    id: string
    name: Path<Inputs>
    label: string
    className?: string
    errorMessage?: string
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
  errorMessage,
  ...restProps
}: AuthInputProps<Inputs>) => (
  <div className={className}>
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <input
      id={id}
      placeholder={label}
      className="block w-full rounded-md border-0 bg-slate-700 py-3 text-slate-50 placeholder:text-slate-400 shadow-sm focus:ring-2 focus:ring-inset focus:ring-green-500 text-base"
      {...restProps}
      {...register?.(name, registerOptions)}
    />
    {errorMessage ? (
      <p className="text-sm text-rose-300 pt-2">{errorMessage}</p>
    ) : null}
  </div>
)
