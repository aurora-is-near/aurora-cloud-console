import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"

export const OracleEnableButton = ({ siloId }: { siloId: number }) => {
  const getSiloOracleUpdater = useOptimisticUpdater("getSiloOracle")
  const router = useRouter()

  const { mutate: createSiloOracle, isPending } = useMutation({
    mutationFn: apiClient.createSiloOracle,
    onSettled: () => {
      getSiloOracleUpdater.invalidate()
      router.push(window.location.pathname)
    },
  })

  const onClick = async () => {
    createSiloOracle({ id: siloId })
  }

  return (
    <Button className="w-full" disabled={isPending} onClick={onClick}>
      Enable feature
    </Button>
  )
}
