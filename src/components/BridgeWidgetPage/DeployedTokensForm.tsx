"use client"

import { useMutation } from "@tanstack/react-query"
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useEffect, useMemo } from "react"
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid"
import toast from "react-hot-toast"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { Tag } from "@/components/Tag"
import { Checkbox } from "@/components/Checkbox"
import type {
  SiloBridgedTokenRequestSchema,
  SiloBridgedTokenSchema,
} from "@/types/api-schemas"
import CopyButton from "@/components/CopyButton"

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
    auroraAddress: string | null
    nearAddress: string | null
    ethereumAddress: string | null
  }[] => {
    const bridgedSiloTokenSymbols = bridgedSiloTokens.map(
      (token) => token.symbol,
    )

    return [
      ...bridgedSiloTokens.map((token) => ({
        id: token.id,
        symbol: token.symbol,
        isPending: token.isDeploymentPending,
        auroraAddress: token.aurora_address,
        nearAddress: token.near_address,
        ethereumAddress: token.ethereum_address,
      })),
      ...bridgedSiloTokenRequests
        .filter((token) => !bridgedSiloTokenSymbols.includes(token.symbol))
        .map((token) => ({
          id: token.id,
          symbol: token.symbol,
          isPending: true,
          auroraAddress: "",
          nearAddress: "",
          ethereumAddress: "",
        })),
    ]
  }, [bridgedSiloTokens, bridgedSiloTokenRequests])

  const generateTokenDescription = (token: {
    id: number
    symbol: string
    isPending: boolean
    auroraAddress: string | null
    nearAddress: string | null
    ethereumAddress: string | null
  }) => {
    if (token.isPending) {
      return "This token is pending deployment.Addresses will be available after deployment."
    }

    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-slate-700">Aurora</h3>
          <div
            className="flex items-center gap-2 bg-slate-100 rounded-md px-2 py-0"
            title={token.auroraAddress ?? ""}
          >
            {token.auroraAddress?.slice(0, 6)}...
            {token.auroraAddress?.slice(-4)}
            <CopyButton value={token.auroraAddress ?? ""} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-slate-700">Near</h3>
          <div
            className="flex items-center gap-2 bg-slate-100 rounded-md px-2 py-0"
            title={token.nearAddress ?? ""}
          >
            {token.nearAddress?.slice(0, 6)}...
            {token.nearAddress?.slice(-4)}
            <CopyButton value={token.nearAddress ?? ""} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-slate-700">Ethereum</h3>
          <div
            className="flex items-center gap-2 bg-slate-100 rounded-md px-2 py-0"
            title={token.ethereumAddress ?? ""}
          >
            {token.ethereumAddress?.slice(0, 6)}...
            {token.ethereumAddress?.slice(-4)}
            <CopyButton value={token.ethereumAddress ?? ""} />
          </div>
        </div>
      </div>
    )
  }

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
              tooltipContent={generateTokenDescription(token)}
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
