"use client"

import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import clsx from "clsx"
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid"
import toast from "react-hot-toast"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { TokenSchema } from "@/types/api-schemas"
import { Tag } from "@/components/Tag"
import { useSubmitOnChange } from "@/hooks/useSubmitOnChange"

type Inputs = Partial<Record<string, boolean>>

type DeployedTokensFormProps = {
  siloId: number
  deployedTokens: TokenSchema[]
  activeTokens: TokenSchema[]
}

const DeployedTokensForm = ({
  siloId,
  deployedTokens,
  activeTokens,
}: DeployedTokensFormProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const getWidgetUpdater = useOptimisticUpdater("getWidget")

  const { mutate: updateWidget, isPending } = useMutation({
    mutationFn: apiClient.updateWidget,
    onMutate: getWidgetUpdater.update,
    onSettled: getWidgetUpdater.invalidate,
    onSuccess: () => {
      toast.success("Widget tokens updated")
    },
    onError: () => {
      toast.error("Failed to update bridge tokens")
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
    activeTokens.forEach((token) => {
      setValue(String(token.id), true)
    })
  }, [setValue, activeTokens])

  useSubmitOnChange(watch, submit)

  return (
    <form>
      <div>
        {deployedTokens.map((token) => {
          const isDeployed = token.bridge?.deploymentStatus === "DEPLOYED"
          const isChecked = watch(`${token.id}`)

          return (
            <div
              key={token.id}
              className={clsx(
                "rounded-md ring-1 p-3",
                isChecked ? "ring-green-600 bg-green-50" : "ring-slate-200",
              )}
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-start items-cented gap-2">
                  <div className="flex items-center h-6">
                    <input
                      disabled={!isDeployed || isPending || isSubmitting}
                      id={`${token.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
                      {...register(`${token.id}`)}
                    />
                  </div>
                  <span className="text-sm font-medium">{token.symbol}</span>
                </div>
                <span className="flex justify-end">
                  {isDeployed ? (
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
                  )}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </form>
  )
}

export default DeployedTokensForm
