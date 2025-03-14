"use client"

import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { Network } from "@/hooks/useWidgetNetworks"
import { WidgetNetworkType } from "@/types/types"
import { isValidNetwork } from "@/utils/widget"
import { Checkbox } from "@/components/Checkbox"

type Inputs = Partial<Record<WidgetNetworkType, boolean>>

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
  const methods = useForm<Inputs>()
  const {
    register,
    setValue,
    formState: { isSubmitting },
    watch,
  } = methods

  const getWidgetUpdater = useOptimisticUpdater("getWidget")

  const { mutate: updateWidget, isPending } = useMutation({
    mutationFn: apiClient.updateWidget,
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

      const data: Parameters<typeof updateWidget>[0] = {
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

      updateWidget(data)
    },
    [siloId, type, updateWidget, networks],
  )

  useEffect(() => {
    networks.forEach((network) => {
      setValue(network.key, true)
    })
  }, [networks, setValue])

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
        {availableNetworks.map((network) => (
          <Checkbox
            key={network.key}
            id={`${type}-${network.key}`}
            name={network.key}
            label={network.label}
            register={register}
            disabled={isPending || isSubmitting}
          />
        ))}
      </div>
    </FormProvider>
  )
}

export default NetworksForm
