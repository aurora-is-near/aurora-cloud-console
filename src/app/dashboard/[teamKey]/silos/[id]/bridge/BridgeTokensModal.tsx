"use client"

import { CheckIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { TokenSchema } from "@/types/api-schemas"

type Inputs = Partial<Record<string, boolean>>

type BridgeTokensModalProps = {
  siloId: number
  deployedTokens: TokenSchema[]
  activeTokens: TokenSchema[]
}

const BridgeTokensModal = ({
  siloId,
  deployedTokens,
  activeTokens,
}: BridgeTokensModalProps) => {
  const { closeModal, activeModal } = useModals()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const getSiloBridgeUpdater = useOptimisticUpdater("getSiloBridge")

  const { mutate: updateSiloBridge, isPending } = useMutation({
    mutationFn: apiClient.updateSiloBridge,
    onSuccess: closeModal,
    onMutate: getSiloBridgeUpdater.update,
    onSettled: getSiloBridgeUpdater.invalidate,
    onError: () => {
      toast.error("Failed to update bridge tokens")
    },
  })

  const submit: SubmitHandler<Inputs> = async (inputs) => {
    const selectedTokens = Object.entries(inputs)
      .filter(([, value]) => value)
      .map(([key]) => Number(key))

    const data: Parameters<typeof updateSiloBridge>[0] = {
      id: siloId,
      tokens: selectedTokens,
    }

    updateSiloBridge(data)
  }

  useEffect(() => {
    activeTokens.forEach((token) => {
      setValue(String(token.id), true)
    })
  }, [setValue, activeTokens])

  return (
    <SlideOver
      title="Supported assets"
      open={activeModal === "BridgeTokens"}
      close={closeModal}
    >
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <div className="space-y-2">
            {deployedTokens.map((token) => {
              const tokenId = String(token.id)

              return (
                <div className="relative flex items-start" key={tokenId}>
                  <div className="flex items-center h-6">
                    <input
                      id={tokenId}
                      type="checkbox"
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
                      {...register(tokenId)}
                    />
                  </div>
                  <label
                    htmlFor={tokenId}
                    className="ml-3 text-sm leading-6 text-gray-900"
                  >
                    {token.symbol}
                  </label>
                </div>
              )
            })}
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

export default BridgeTokensModal
