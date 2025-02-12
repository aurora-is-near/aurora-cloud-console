"use client"

import { Button } from "@/components/Button"
import { useSiloDeployment } from "@/hooks/useSiloDeployment"

type StartDeploymentButtonProps = {
  teamId: number
}

export const StartDeploymentButton = ({
  teamId,
}: StartDeploymentButtonProps) => {
  const { status, startDeployment } = useSiloDeployment(teamId)
  const isLoading = status !== "NOT_STARTED"

  return (
    <Button onClick={startDeployment} loading={isLoading}>
      Start deployment
    </Button>
  )
}
