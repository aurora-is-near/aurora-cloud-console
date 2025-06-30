import { ReactNode } from "react"
import { FieldErrors, Path } from "react-hook-form"

export type InputWrapperProps<Inputs extends Record<string, unknown>> = {
  id: string
  inputName: Path<Inputs>
  label?: string
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
}: InputWrapperProps<Inputs>) => {
  const errorMessage = errors?.[inputName]?.message

  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={id}
          className="py-2 flex text-sm font-medium leading-none"
        >
          {label}
        </label>
      ) : null}
      <div className="w-full">
        {children}
        {!!errorMessage && (
          <p className="mt-1.5 text-sm font-medium text-red-500">
            {String(errorMessage)}
          </p>
        )}
      </div>
    </div>
  )
}
