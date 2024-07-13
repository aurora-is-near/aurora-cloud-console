import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"

export const BridgeEnableButton = ({ siloId }: { siloId: number }) => {
  const getSiloBridgeUpdater = useOptimisticUpdater("getSiloBridge")
  const router = useRouter()

  const { mutate: createSiloBridge, isPending } = useMutation({
    mutationFn: apiClient.createSiloBridge,
    onSettled: () => {
      getSiloBridgeUpdater.invalidate()
      router.push(window.location.pathname)
    },
  })

  const onClick = async () => {
    createSiloBridge({ id: siloId })
  }

  return (
    <Button className="w-full" disabled={isPending} onClick={onClick}>
      Enable feature
    </Button>
  )
}
