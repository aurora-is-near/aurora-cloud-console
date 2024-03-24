import { Button } from "@/components/Button"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { useMutation } from "@tanstack/react-query"

export const OracleEnableButton = ({ siloId }: { siloId: number }) => {
  const getSiloOracleUpdater = useOptimisticUpdater("getSiloOracle")

  const { mutate: createSiloOracle, isPending } = useMutation({
    mutationFn: apiClient.createSiloOracle,
    onSettled: getSiloOracleUpdater.invalidate,
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
