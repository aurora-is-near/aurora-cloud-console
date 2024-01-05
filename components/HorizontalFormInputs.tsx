"use client"

import { HorizontalInput } from "@/components/HorizontalInput"
import { Path, PathValue, SubmitHandler, useForm } from "react-hook-form"
import Button from "@/components/Button"
import { CheckIcon } from "@heroicons/react/24/outline"

type HorizontalFormProps<Inputs extends Record<string, unknown>> = {
  submitHandler: SubmitHandler<Inputs>
  inputs: {
    name: Path<Inputs>
    label: string
    value: PathValue<Inputs, Path<Inputs>>
    autoComplete?: string
    required?: boolean
  }[]
}

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
        {inputs.map((input) => (
          <HorizontalInput
            key={input.name}
            required={input.required}
            id={input.name}
            name={input.name}
            label={input.label}
            autoComplete={input.autoComplete}
            register={register}
            errors={errors}
            registerOptions={{
              value: input.value,
              required: `${input.label} is required`,
            }}
          />
        ))}
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
