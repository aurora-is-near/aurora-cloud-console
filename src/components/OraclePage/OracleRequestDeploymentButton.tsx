"use client"

import { useTransition } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { Silo, Team } from "@/types/types"
import { requestOracleDeployment } from "@/actions/contact/request-oracle-deployment"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"

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
        await requestOracleDeployment(team, silo)
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
