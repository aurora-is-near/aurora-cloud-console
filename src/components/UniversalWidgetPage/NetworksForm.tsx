"use client"

import debounce from "debounce"
import { SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import clsx from "clsx"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { Network } from "@/hooks/useWidgetNetworks"
import { Widget, WidgetNetworkType } from "@/types/types"
import { isValidNetwork } from "@/utils/widget"

type Inputs = Partial<Record<WidgetNetworkType, boolean>>

type NetworksFormProps = {
  siloId: number
  type: "to" | "from"
  networks: Network[]
  availableNetworks: Network[]
  widget?: Widget | null
}

const NetworksForm = ({
  siloId,
  type,
  networks,
  availableNetworks,
  widget,
}: NetworksFormProps) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<Inputs>()

  const getWidgetUpdater = useOptimisticUpdater("getWidget")

  const { mutate: upsertWidget, isPending } = useMutation({
    mutationFn: apiClient.upsertWidget,
    onMutate: getWidgetUpdater.update,
    onSettled: getWidgetUpdater.invalidate,
    onSuccess: () => {
      toast.success("Widget networks updated")
    },
    onError: () => {
      toast.error("Failed to update widget networks")
    },
  })

  const submit = useCallback<SubmitHandler<Inputs>>(
    (inputs: Inputs) => {
      const selectedNetworks = Object.entries(inputs)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .filter(isValidNetwork)

      const data: Parameters<typeof upsertWidget>[0] = {
        id: siloId,
      }

      if (selectedNetworks === networks.map((network) => network.key)) {
        return
      }

      if (type === "from") {
        data.fromNetworks = selectedNetworks
      }

      if (type === "to") {
        data.toNetworks = selectedNetworks
      }

      upsertWidget(data)
    },
    [siloId, type, upsertWidget, networks],
  )

  useEffect(() => {
    networks.forEach((network) => {
      setValue(network.key, true)
    })
  }, [networks, setValue])

  useEffect(() => {
    const debouncedCb = debounce((inputs: Inputs) => submit(inputs), 1000)

    const subscription = watch(debouncedCb)

    return () => {
      subscription.unsubscribe()
    }
  }, [submit, watch])

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <div className="flex flex-col space-y-2">
          {availableNetworks.map((network) => (
            <div
              key={network.key}
              className={clsx(
                "rounded-md ring-1",
                getValues(network.key)
                  ? "ring-green-600 bg-green-50"
                  : "ring-slate-200",
              )}
            >
              <label
                htmlFor={`${type}-${network.key}`}
                className="flex items-start w-full cursor-pointer p-3"
              >
                <div className="flex items-center h-6">
                  <input
                    disabled={isPending || isSubmitting}
                    id={`${type}-${network.key}`}
                    type="checkbox"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
                    {...register(network.key)}
                  />
                </div>
                <span className="ml-3 text-sm leading-6 text-gray-900">
                  {network.label}
                </span>
              </label>
            </div>
          ))}
          {/* DESIGN NOT YET COMPLETED
          <Button
            variant="border"
            className="!p-6 !bg-slate-50 !border-slate-200"
          >
            <div className="flex flex-row gap-2">
              <PlusIcon className="w-4 h-4" />
              <span>Add network</span>
            </div>
          </Button> */}
        </div>
      </div>
    </form>
  )
}

export default NetworksForm
