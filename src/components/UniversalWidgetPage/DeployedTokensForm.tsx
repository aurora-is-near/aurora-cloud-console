import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import clsx from "clsx"
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid"
import debounce from "debounce"
import toast from "react-hot-toast"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { TokenSchema } from "@/types/api-schemas"
import { Tag } from "@/components/Tag"

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
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const getWidgetUpdater = useOptimisticUpdater("getWidget")

  const { mutate: upsertWidget, isPending } = useMutation({
    mutationFn: apiClient.upsertWidget,
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

      const data: Parameters<typeof upsertWidget>[0] = {
        id: siloId,
        tokens: selectedTokens,
      }

      upsertWidget(data)
    },
    [upsertWidget, siloId],
  )

  useEffect(() => {
    activeTokens.forEach((token) => {
      setValue(String(token.id), true)
    })
  }, [setValue, activeTokens])

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
        {deployedTokens.map((token) => {
          const isDeployed = token.bridge?.deploymentStatus === "DEPLOYED"

          return (
            <div
              key={token.id}
              className={clsx(
                "rounded-md ring-1 p-3",
                isDeployed ? "ring-green-600 bg-green-50" : "ring-slate-200",
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
