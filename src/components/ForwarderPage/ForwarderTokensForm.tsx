"use client"

import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { Silo } from "@/types/types"
import { Checkbox } from "@/components/Checkbox"
import { ForwarderTokenSymbol } from "@/types/forwarder-tokens"

type Inputs = Partial<Record<ForwarderTokenSymbol, boolean>>

type ForwarderTokensFormProps = {
  silo: Silo
  defaultValues: Inputs
}

export const ForwarderTokensForm = ({
  silo,
  defaultValues,
}: ForwarderTokensFormProps) => {
  const methods = useForm<Inputs>({ defaultValues })
  const {
    register,
    formState: { isSubmitting },
    watch,
  } = methods

  const getForwarderTokensUpdater = useOptimisticUpdater("getForwarderTokens")

  const { mutate: updateForwarderTokens, isPending } = useMutation({
    mutationFn: apiClient.updateForwarderTokens,
    onMutate: getForwarderTokensUpdater.update,
    onSettled: getForwarderTokensUpdater.invalidate,
    onSuccess: () => {
      toast.success("Forwarder tokens updated")
    },
    onError: () => {
      toast.error("Failed to update forwarder tokens")
    },
  })

  const submit = useCallback<SubmitHandler<Inputs>>(
    (inputs: Inputs) => {
      const selectedTokens = Object.entries(inputs)
        .filter(([, value]) => value)
        .map(([key]) => key as ForwarderTokenSymbol)

      updateForwarderTokens({
        id: silo.id,
        tokens: selectedTokens,
      })
    },
    [silo.id, updateForwarderTokens],
  )

  useEffect(() => {
    const subscription = watch((value, { name, type: operation }) => {
      if (operation === "change" && name) {
        submit(value)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, submit])

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col space-y-2">
        {Object.keys(defaultValues).map((tokenSymbol) => (
          <Checkbox
            key={tokenSymbol}
            id={tokenSymbol}
            name={tokenSymbol as ForwarderTokenSymbol}
            label={tokenSymbol}
            register={register}
            disabled={isPending || isSubmitting}
          />
        ))}
      </div>
    </FormProvider>
  )
}
