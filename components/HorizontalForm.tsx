"use client"

import { HorizontalInput } from "@/components/HorizontalInput"
import { Path, PathValue, SubmitHandler, useForm } from "react-hook-form"
import Button from "@/components/Button"
import { CheckIcon } from "@heroicons/react/24/outline"
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from "react"
import { HorizontalSelectInput } from "@/components/HorizontalSelectInput"

type SharedInputProps<Inputs extends Record<string, unknown>> = {
  name: Path<Inputs>
  label: string
  value?: PathValue<Inputs, Path<Inputs>>
  defaultValue?: PathValue<Inputs, Path<Inputs>>
}

type InputProps<Inputs extends Record<string, unknown>> =
  SharedInputProps<Inputs> &
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SelectInputProps<Inputs extends Record<string, unknown>> =
  SharedInputProps<Inputs> &
    DetailedHTMLProps<
      SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    > & {
      options: {
        label: string
        value: string | number
      }[]
    }

type Input<Inputs extends Record<string, unknown>> =
  | InputProps<Inputs>
  | SelectInputProps<Inputs>

export type HorizontalFormProps<Inputs extends Record<string, unknown>> = {
  submitHandler: SubmitHandler<Inputs>
  inputs: Input<Inputs>[]
}

const isSelectInput = <Inputs extends Record<string, unknown>>(
  input: Input<Record<string, unknown>>,
): input is SelectInputProps<Inputs> => "options" in input

export const HorizontalForm = <Inputs extends Record<string, unknown>>({
  inputs,
  submitHandler,
}: HorizontalFormProps<Inputs>) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>()

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="space-y-4">
        {inputs.map((inputProps) => {
          const commonProps = {
            name: inputProps.name,
            id: inputProps.id ?? inputProps.name,
            label: inputProps.label,
            register,
            errors,
            registerOptions: {
              value: inputProps.value,
              required: `${inputProps.label} is required`,
            },
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
        <Button
          type="submit"
          onClick={handleSubmit(submitHandler)}
          loading={isSubmitting}
        >
          <CheckIcon className="w-5 h-5" />
          <span>Save</span>
        </Button>
      </div>
    </form>
  )
}
