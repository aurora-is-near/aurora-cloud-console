import clsx from "clsx"
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react"
import {
  Path,
  RegisterOptions,
  useFormContext,
  UseFormRegister,
} from "react-hook-form"
import { InformationCircleIcon } from "@heroicons/react/24/solid"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"

export type CheckboxProps<Inputs extends Record<string, unknown>> =
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label: string
    id: string
    name: Path<Inputs>
    className?: string
    register?: UseFormRegister<Inputs>
    registerOptions?: RegisterOptions<Inputs, Path<Inputs>>
    afterLabel?: ReactNode
    tooltipContent?: ReactNode
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
  tooltipContent,
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
      {!!tooltipContent && (
        <div className="flex items-center p-3">
          <Popover className="relative">
            <PopoverButton
              aria-label="Show token details"
              className="flex items-center justify-center w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors duration-200"
            >
              <InformationCircleIcon className="w-6 h-6" />
            </PopoverButton>
            <PopoverPanel className="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white p-4 text-sm text-slate-700">
                  {tooltipContent}
                </div>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      )}
    </div>
  )
}
