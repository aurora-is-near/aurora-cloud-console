"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import clsx from "clsx"
import { BridgeNetworkType } from "@/types/types"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { Network } from "@/hooks/useBridgeNetworks"
import { isValidNetwork } from "@/utils/bridge"
import Card from "@/components/Card"

type Inputs = Partial<Record<BridgeNetworkType, boolean>>

type NetworksFormProps = {
  siloId: number
  type: "to" | "from"
  networks: Network[]
  availableNetworks: Network[]
}

const NetworksForm = ({
  siloId,
  type,
  networks,
  availableNetworks,
}: NetworksFormProps) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const getSiloBridgeUpdater = useOptimisticUpdater("getSiloBridge")

  const { mutate: updateSiloBridge, isPending } = useMutation({
    mutationFn: apiClient.updateSiloBridge,
    onMutate: getSiloBridgeUpdater.update,
    onSettled: getSiloBridgeUpdater.invalidate,
    onError: () => {
      toast.error("Failed to update bridge networks")
    },
  })

  const submit: SubmitHandler<Inputs> = async (inputs) => {
    const selectedNetworks = Object.entries(inputs)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .filter(isValidNetwork)

    const data: Parameters<typeof updateSiloBridge>[0] = {
      id: siloId,
    }

    if (type === "from") {
      data.fromNetworks = selectedNetworks
    }

    if (type === "to") {
      data.toNetworks = selectedNetworks
    }

    updateSiloBridge(data)
  }

  useEffect(() => {
    networks.forEach((network) => {
      setValue(network.key, true)
    })
  }, [networks, setValue])

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <div className="space-y-2">
          {availableNetworks.map((network) => (
            <Card
              key={network.key}
              className={clsx(
                "p-0 md:p-0",
                getValues(network.key)
                  ? "ring-1 ring-green-600 md:bg-green-50"
                  : "",
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
            </Card>
          ))}
        </div>
      </div>
    </form>
  )
}

export default NetworksForm
