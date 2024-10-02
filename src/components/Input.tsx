import clsx from "clsx"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form"

export type InputProps<Inputs extends Record<string, unknown>> =
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    id: string
    name: Path<Inputs>
    className?: string
    register?: UseFormRegister<Inputs>
    registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
  }

export const Input = <Inputs extends Record<string, unknown>>({
  name,
  className,
  register,
  registerOptions,
  disabled,
  ...restProps
}: InputProps<Inputs>) => (
  <input
    name={name}
    disabled={disabled}
    className={clsx(
      "block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6",
      disabled ? "bg-slate-100 text-slate-500" : "text-slate-900",
      className,
    )}
    {...restProps}
    {...register?.(name, registerOptions)}
  />
)
