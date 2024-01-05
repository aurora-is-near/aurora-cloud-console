"use client"

import { HorizontalInput } from "@/components/HorizontalInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { Token } from "@/types/types"
import Button from "@/components/Button"
import { CheckIcon } from "@heroicons/react/24/outline"
import { updateToken } from "@/actions/admin/tokens/update-token"
import { useState } from "react"
import { Alert } from "@/components/Alert"
import { createToken } from "@/actions/admin/tokens/create-token"

type TokenFormProps = {
  token?: Token
}

type Inputs = {
  name: string
  address: string
  type: string
}

export const TokenForm = ({ token }: TokenFormProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const update: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    setSuccessMessage(null)

    if (token) {
      await updateToken(token.id, inputs)
      setSuccessMessage("Token updated")

      return
    }

    const newToken = await createToken(inputs)

    window.location.href = `/admin/tokens?new_token=${newToken?.id}`
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>()

  return (
    <>
      {successMessage && (
        <Alert dismissable type="success" className="mb-6">
          {successMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit(update)}>
        <div className="space-y-4">
          <HorizontalInput
            required
            id="name"
            name="name"
            label="Name"
            autoComplete="name"
            register={register}
            error={errors.name}
            registerOptions={{
              value: token?.name ?? "",
              required: "Name is required",
            }}
          />

          <HorizontalInput
            required
            id="address"
            name="address"
            label="Address"
            autoComplete="address"
            register={register}
            error={errors.address}
            registerOptions={{
              value: token?.address ?? "",
              required: "Address is required",
            }}
          />

          <HorizontalInput
            required
            id="type"
            name="type"
            label="Type"
            autoComplete="type"
            register={register}
            error={errors.type}
            registerOptions={{
              value: token?.type ?? "",
              required: "Type is required",
            }}
          />
        </div>
        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            onClick={handleSubmit(update)}
            loading={isSubmitting}
          >
            <CheckIcon className="w-5 h-5" />
            <span>Save</span>
          </Button>
        </div>
      </form>
    </>
  )
}
