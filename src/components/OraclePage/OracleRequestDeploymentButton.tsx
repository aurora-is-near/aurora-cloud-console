"use client"

import { useTransition } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { Silo, Team } from "@/types/types"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { requestIntegration } from "@/actions/silos/request-integration"

type OracleRequestDeploymentButtonProps = {
  silo: Silo
  team: Team
}

export const OracleRequestDeploymentButton = ({
  silo,
  team,
}: OracleRequestDeploymentButtonProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const getSiloOracleUpdater = useOptimisticUpdater("getSiloOracle")

  const onClick = () => {
    if (silo) {
      startTransition(async () => {
        await requestIntegration(team, silo, "Oracle")
        getSiloOracleUpdater.invalidate()

        toast.success("Oracle deployment requested")
        router.refresh()
      })
    }
  }

  return (
    <Button size="lg" disabled={isPending} onClick={onClick}>
      Request deployment
    </Button>
  )
}
