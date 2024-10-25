"use client"

import { CheckIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { WidgetNetworkType } from "@/types/types"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { isValidNetwork } from "@/utils/widget"
import { Modals } from "@/utils/modals"
import { Network } from "@/hooks/useWidgetNetworks"

type Inputs = Partial<Record<WidgetNetworkType, boolean>>

type WidgetNetworkModalProps = {
  siloId: number
  type: "to" | "from"
  networks: Network[]
  availableNetworks: Network[]
}

const WidgetNetworkModal = ({
  siloId,
  type,
  networks,
  availableNetworks,
}: WidgetNetworkModalProps) => {
  const { closeModal, activeModal } = useModals()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const getWidgetUpdater = useOptimisticUpdater("getWidget")

  const { mutate: updateWidget, isPending } = useMutation({
    mutationFn: apiClient.updateWidget,
    onSuccess: closeModal,
    onMutate: getWidgetUpdater.update,
    onSettled: getWidgetUpdater.invalidate,
    onError: () => {
      toast.error("Failed to update bridge networks")
    },
  })

  const submit: SubmitHandler<Inputs> = async (inputs) => {
    const selectedNetworks = Object.entries(inputs)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .filter(isValidNetwork)

    const data: Parameters<typeof updateWidget>[0] = {
      id: siloId,
    }

    if (type === "from") {
      data.fromNetworks = selectedNetworks
    }

    if (type === "to") {
      data.toNetworks = selectedNetworks
    }

    updateWidget(data)
  }

  useEffect(() => {
    networks.forEach((network) => {
      setValue(network.key, true)
    })
  }, [networks, setValue])

  const modalType =
    type === "to" ? Modals.WidgetToNetwork : Modals.WidgetFromNetwork

  return (
    <SlideOver
      title={type === "to" ? "Destination networks" : "Origin networks"}
      open={activeModal === modalType}
      close={closeModal}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <div className="space-y-2">
            {availableNetworks.map((network) => (
              <div className="relative flex items-start" key={network.key}>
                <div className="flex items-center h-6">
                  <input
                    id={network.key}
                    type="checkbox"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
                    {...register(network.key)}
                  />
                </div>
                <label
                  htmlFor={network.key}
                  className="ml-3 text-sm leading-6 text-gray-900"
                >
                  {network.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
      <SlideOver.Actions>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          loading={isSubmitting}
          onClick={handleSubmit(submit)}
          disabled={isPending}
        >
          <CheckIcon className="w-5 h-5" />
          Save
        </Button>
      </SlideOver.Actions>
    </SlideOver>
  )
}

export default WidgetNetworkModal
