import { Button } from "@/components/Button"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { useMutation } from "@tanstack/react-query"

// Remove this once we have a chance to finish the feature!
const IS_TEMPORARILY_DISABLED = true

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
    <Button
      className="w-full"
      disabled={isPending || IS_TEMPORARILY_DISABLED}
      onClick={onClick}
    >
      Enable feature
    </Button>
  )
}
