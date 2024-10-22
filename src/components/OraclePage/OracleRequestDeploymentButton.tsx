"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"

type OracleRequestDeploymentButtonProps = {
  siloId: number
}

export const OracleRequestDeploymentButton = ({
  siloId,
}: OracleRequestDeploymentButtonProps) => {
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
    if (siloId) {
      createSiloOracle({ id: siloId })
    }
  }

  return (
    <Button size="lg" disabled={isPending} onClick={onClick}>
<<<<<<<< HEAD:src/components/OraclePage/OracleEnableButton.tsx
      Enable feature
========
      Request deployment
>>>>>>>> 3f715b905df9abd173054579a9ffd3b6404aeb15:src/components/OraclePage/OracleRequestDeploymentButton.tsx
    </Button>
  )
}
