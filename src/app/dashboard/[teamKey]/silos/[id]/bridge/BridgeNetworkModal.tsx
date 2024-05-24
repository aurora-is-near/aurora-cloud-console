"use client"

import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { CheckIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { BridgeNetworkType } from "@/types/types"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { useBridgeNetworks } from "@/hooks/useBridgeNetworks"
import { isValidNetwork } from "@/utils/bridge"
import { BRIDGE_NETWORKS } from "@/constants/bridge"
import { Modals } from "@/utils/modals"

type Inputs = Partial<Record<BridgeNetworkType, boolean>>

type BridgeNetworkModalProps = {
  siloId: number
  type: "to" | "from"
}

const BridgeNetworkModal = ({ siloId, type }: BridgeNetworkModalProps) => {
  const { closeModal, activeModal } = useModals()
  const wereValuesSet = useRef(false)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const { toNetworks, fromNetworks, availableNetworks } =
    useBridgeNetworks(siloId)

  const networks = type === "to" ? toNetworks : fromNetworks

  const getSiloBridgeUpdater = useOptimisticUpdater("getSiloBridge")

  const { mutate: updateSiloBridge, isPending } = useMutation({
    mutationFn: apiClient.updateSiloBridge,
    onSuccess: closeModal,
    onMutate: getSiloBridgeUpdater.update,
    onSettled: getSiloBridgeUpdater.invalidate,
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

    await updateSiloBridge(data)
  }

  useEffect(() => {
    if (wereValuesSet.current) {
      return
    }

    wereValuesSet.current = true
    networks.forEach((network) => {
      setValue(network.key, true)
    })
  }, [networks, setValue, isPending])

  const modalType =
    type === "to" ? Modals.BridgeToNetwork : Modals.BridgeFromNetwork

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

export default BridgeNetworkModal
