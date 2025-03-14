import clsx from "clsx"
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react"
import {
  Path,
  RegisterOptions,
  useFormContext,
  UseFormRegister,
} from "react-hook-form"

export type CheckboxProps<Inputs extends Record<string, unknown>> =
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label: string
    id: string
    name: Path<Inputs>
    className?: string
    register?: UseFormRegister<Inputs>
    registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
    afterLabel?: ReactNode
  }

export const Checkbox = <Inputs extends Record<string, unknown>>({
  label,
  id,
  name,
  register,
  registerOptions,
  className,
  afterLabel,
  disabled,
  ...restProps
}: CheckboxProps<Inputs>) => {
  const registerProps = register?.(name, registerOptions)
  const formContext = useFormContext()
  const isChecked = formContext?.watch(name)
  const cursorClassName = disabled ? "cursor-not-allowed" : "cursor-pointer"

  return (
    <div
      className={clsx(
        "rounded-md ring-1 flex flex-row",
        isChecked ? "ring-green-600 bg-green-50" : "ring-slate-200",
        className,
      )}
    >
      <label
        htmlFor={id}
        className={clsx("flex items-start w-full p-3", cursorClassName)}
      >
        <div className="flex items-center h-6">
          <input
            id={id}
            type="checkbox"
            className={clsx(
              "w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-600",
              cursorClassName,
            )}
            disabled={disabled}
            {...restProps}
            {...registerProps}
          />
        </div>
        <span
          className={clsx(
            "ml-3 text-sm leading-6",
            disabled ? "text-slate-400" : "text-slate-900",
          )}
        >
          {label}
        </span>
      </label>
      {!!afterLabel && (
        <div className="flex items-center p-3">{afterLabel}</div>
      )}
    </div>
  )
}
