"use client"

import {
  FieldErrors,
  FormProvider,
  Path,
  PathValue,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { CheckIcon } from "@heroicons/react/24/outline"
import { DetailedHTMLProps, InputHTMLAttributes, useCallback } from "react"
import { Button } from "@/components/Button"
import { HorizontalInput } from "@/components/HorizontalInput"
import { HorizontalSelectInput } from "@/components/HorizontalSelectInput"
import { HorizontalToggleInput } from "@/components/HorizontalToggleInput"
import { toError } from "@/utils/errors"
import { Alert } from "@/components/Alert"

type SharedInputProps<Inputs extends Record<string, unknown>> = {
  name: Path<Inputs>
  label: string
  value?: PathValue<Inputs, Path<Inputs>>
}

type InputProps<Inputs extends Record<string, unknown>> =
  SharedInputProps<Inputs> &
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type ToggleInputProps<Inputs extends Record<string, unknown>> =
  SharedInputProps<Inputs> &
    DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > & {
      type: "toggle"
      defaultValue?: boolean
    }

type SelectInputOption = {
  label: string
  value: string | number
}

type SelectInputProps<Inputs extends Record<string, unknown>> = Omit<
  InputProps<Inputs>,
  "defaultValue"
> & {
  options: SelectInputOption[]
  isCreatable?: boolean
  noOptionsMessage?: () => string
} & (
    | {
        isMulti: true
        defaultValue?: SelectInputOption[]
        getValue: (options: SelectInputOption[]) => unknown
      }
    | {
        isMulti?: never
        defaultValue?: SelectInputOption
        getValue: (option?: SelectInputOption) => unknown
      }
  )

type Divider = {
  type: "divider"
}

type Input<Inputs extends Record<string, unknown>> =
  | InputProps<Inputs>
  | SelectInputProps<Inputs>
  | ToggleInputProps<Inputs>
  | Divider

export type HorizontalFormProps<Inputs extends Record<string, unknown>> = {
  submitHandler: SubmitHandler<Inputs>
  onCancel?: () => void
  inputs: Input<Inputs>[]
  errors?: FieldErrors<Inputs>
}

const isSelectInput = <Inputs extends Record<string, unknown>>(
  input: Input<Record<string, unknown>>,
): input is SelectInputProps<Inputs> => "options" in input

const isToggleInput = <Inputs extends Record<string, unknown>>(
  input: Input<Record<string, unknown>>,
): input is ToggleInputProps<Inputs> => input.type === "toggle"

const isDivider = (input: Input<Record<string, unknown>>): input is Divider =>
  input.type === "divider"

export const HorizontalForm = <Inputs extends Record<string, unknown>>({
  inputs,
  submitHandler,
  onCancel,
  errors,
}: HorizontalFormProps<Inputs>) => {
  const methods = useForm<Inputs>()
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors: internalErrors },
  } = methods

  const onSubmit = useCallback(async () => {
    try {
      await handleSubmit(submitHandler)()
    } catch (err) {
      setError("root", {
        message: toError(err).message,
      })
    }
  }, [handleSubmit, setError, submitHandler])

  return (
    <FormProvider {...methods}>
      {!!internalErrors.root?.message && (
        <Alert type="error" className="mb-6">
          {internalErrors.root?.message}
        </Alert>
      )}
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          {inputs.map((inputProps) => {
            if (isDivider(inputProps)) {
              return (
                <div key="divider" className="h-8 pt-2 flex items-center">
                  <div className="border-b border-gray-200 w-full" />
                </div>
              )
            }

            const commonProps = {
              name: inputProps.name,
              id: inputProps.id ?? inputProps.name,
              label: inputProps.label,
              register,
              errors: {
                ...internalErrors,
                ...errors,
              },
              registerOptions: {
                value: inputProps.value,
                required: inputProps.required
                  ? `${inputProps.label} is required`
                  : undefined,
              },
            }

            if (isToggleInput(inputProps)) {
              return (
                <HorizontalToggleInput
                  key={inputProps.name}
                  {...commonProps}
                  {...inputProps}
                />
              )
            }

            if (isSelectInput(inputProps)) {
              return (
                <HorizontalSelectInput
                  key={inputProps.name}
                  {...commonProps}
                  {...inputProps}
                />
              )
            }

            return (
              <HorizontalInput
                key={inputProps.name}
                {...commonProps}
                {...inputProps}
              />
            )
          })}
        </div>
        <div className="flex justify-end mt-8">
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              className="mr-2"
              variant="secondary"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" onClick={onSubmit} loading={isSubmitting}>
            <CheckIcon className="w-5 h-5" />
            <span>Save</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
