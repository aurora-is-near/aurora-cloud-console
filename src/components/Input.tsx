import clsx from "clsx"
import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form"

export type InputProps<Inputs extends Record<string, unknown>> =
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    id: string
    name: Path<Inputs>
    icon?: React.ReactNode
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
  icon: Icon,
  ...restProps
}: InputProps<Inputs>) => (
  <div className="flex align-center w-full rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-green-600 sm:text-sm sm:leading-6">
    {Icon ? (
      <div className="flex items-center align-center pointer-events-none">
        {Icon}
      </div>
    ) : null}
    <input
      name={name}
      disabled={disabled}
      className={clsx(
        "block w-full py-1.5 border-0 rounded-md placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-0",
        disabled ? "bg-gray-100 text-gray-500" : "text-gray-900",
        Icon ? "pl-0" : "",
        className,
      )}
      {...restProps}
      {...register?.(name, registerOptions)}
    />
  </div>
)
