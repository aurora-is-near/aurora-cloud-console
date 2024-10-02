import clsx from "clsx"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form"

export type InputProps<Inputs extends Record<string, unknown>> = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type"
> & {
  id: string
  name: Path<Inputs>
  label: string
  className?: string
  register?: UseFormRegister<Inputs>
  registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
}

export const RadioInput = <Inputs extends Record<string, unknown>>({
  id,
  name,
  label,
  className,
  register,
  registerOptions,
  ...restProps
}: InputProps<Inputs>) => (
  <div className={clsx("flex flex-row items-center", className)}>
    <input
      id={id}
      name={name}
      type="radio"
      className="w-4 h-4 text-green-600 border-slate-300 rounded-full focus:ring-green-600"
      {...restProps}
      {...register?.(name, registerOptions)}
    />
    <label htmlFor={id} className="ml-3 text-sm leading-none text-slate-900">
      {label}
    </label>
  </div>
)
