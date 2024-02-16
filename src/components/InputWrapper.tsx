import clsx from "clsx"
import { ReactNode } from "react"
import { FieldErrors, Path } from "react-hook-form"

export type InputWrapperProps<Inputs extends Record<string, unknown>> = {
  id: string
  inputName: Path<Inputs>
  label: string
  children: ReactNode
  errors?: FieldErrors<Inputs>
  className?: string
}

export const InputWrapper = <Inputs extends Record<string, unknown>>({
  id,
  inputName,
  label,
  children,
  errors,
  className,
}: InputWrapperProps<Inputs>) => (
  <div className={className}>
    <label
      htmlFor={id}
      className="pb-2 block text-sm font-medium leading-none flex items-center"
    >
      {label}
    </label>
    <div className="w-full">
      {children}
      {!!errors?.[inputName]?.message && (
        <p className="mt-1.5 text-sm font-medium text-red-500">
          {errors[inputName]?.message?.toString()}
        </p>
      )}
    </div>
  </div>
)
