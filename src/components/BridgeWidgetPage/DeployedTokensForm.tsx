"use client"

import { useMutation } from "@tanstack/react-query"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useEffect, useMemo } from "react"
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid"
import toast from "react-hot-toast"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { Tag } from "@/components/Tag"
import { Checkbox } from "@/components/Checkbox"
import {
  SiloBridgedTokenRequestSchema,
  SiloBridgedTokenSchema,
} from "@/types/api-schemas"

type Inputs = Partial<Record<string, boolean>>

type DeployedTokensFormProps = {
  siloId: number
  bridgedSiloTokens: SiloBridgedTokenSchema[]
  bridgedSiloTokenRequests: SiloBridgedTokenRequestSchema[]
  activeTokenIds: number[]
}

const DeployedTokensForm = ({
  siloId,
  bridgedSiloTokens,
  bridgedSiloTokenRequests,
  activeTokenIds,
}: DeployedTokensFormProps) => {
  const methods = useForm<Inputs>()
  const {
    register,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods

  const getWidgetUpdater = useOptimisticUpdater("getWidget")

  const { mutate: updateWidget, isPending } = useMutation({
    mutationFn: apiClient.updateWidget,
    onMutate: getWidgetUpdater.update,
    onSettled: getWidgetUpdater.invalidate,
    onSuccess: () => {
      toast.success("Active tokens updated")
    },
    onError: () => {
      toast.error("Failed to update active tokens")
    },
  })

  const submit = useCallback<SubmitHandler<Inputs>>(
    (inputs) => {
      const selectedTokens = Object.entries(inputs)
        .filter(([, value]) => value)
        .map(([key]) => Number(key))

      const data: Parameters<typeof updateWidget>[0] = {
        id: siloId,
        tokens: selectedTokens,
      }

      updateWidget(data)
    },
    [updateWidget, siloId],
  )

  useEffect(() => {
    activeTokenIds.forEach((tokenId) => {
      setValue(String(tokenId), true)
    })
  }, [setValue, activeTokenIds])

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name) {
        submit(value)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, submit])

  // Merge the confirmed, bridgeable tokens with any requested custom tokens.
  const tokens = useMemo((): {
    id: number
    symbol: string
    isPending: boolean
  }[] => {
    const bridgedSiloTokenSymbols = bridgedSiloTokens.map(
      (token) => token.symbol,
    )

    return [
      ...bridgedSiloTokens.map((token) => ({
        id: token.id,
        symbol: token.symbol,
        isPending: token.isDeploymentPending,
      })),
      ...bridgedSiloTokenRequests
        .filter((token) => !bridgedSiloTokenSymbols.includes(token.symbol))
        .map((token) => ({
          id: token.id,
          symbol: token.symbol,
          isPending: true,
        })),
    ]
  }, [bridgedSiloTokens, bridgedSiloTokenRequests])

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col space-y-2">
        {tokens.map((token) => {
          return (
            <Checkbox
              key={token.id}
              label={token.symbol}
              id={String(token.id)}
              name={String(token.id)}
              disabled={isPending || isSubmitting || token.isPending}
              register={register}
              afterLabel={
                !token.isPending ? (
                  <Tag
                    size="sm"
                    color="green"
                    text="Deployed"
                    Icon={CheckIcon}
                  />
                ) : (
                  <Tag
                    size="sm"
                    color="orange"
                    text="Pending"
                    Icon={ClockIcon}
                  />
                )
              }
            />
          )
        })}
      </div>
    </FormProvider>
  )
}

export default DeployedTokensForm
