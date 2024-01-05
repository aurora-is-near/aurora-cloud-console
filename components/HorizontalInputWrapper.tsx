import { Input, InputProps } from "@/components/Input"
import { ReactNode } from "react"
import { FieldErrors, Path } from "react-hook-form"

type HorizontalInputWrapperProps<Inputs extends Record<string, unknown>> = {
  id: string
  inputName: Path<Inputs>
  label: string
  children: ReactNode
  errors?: FieldErrors<Inputs>
}

export const HorizontalInputWrapper = <Inputs extends Record<string, unknown>>({
  id,
  inputName,
  label,
  children,
  errors,
}: HorizontalInputWrapperProps<Inputs>) => (
  <div className="sm:grid sm:grid-cols-2 min-h-9">
    <label
      htmlFor={id}
      className="py-1.5 block text-sm font-medium leading-none text-gray-500"
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
