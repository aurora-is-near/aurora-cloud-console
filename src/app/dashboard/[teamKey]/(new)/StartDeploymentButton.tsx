"use client"

import { useState } from "react"
import { Button } from "@/components/Button"
import { deploySilo } from "@/actions/deployment/deploy-silo"
import { logger } from "@/logger"

type StartDeploymentButtonProps = {
  teamId: number
}

export const StartDeploymentButton = ({
  teamId,
}: StartDeploymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const onStartDeploymentClick = async () => {
    setIsLoading(true)

    try {
      await deploySilo(teamId)
    } catch (error) {
      logger.error(error)
    }

    setIsLoading(false)
  }

  return (
    <Button onClick={onStartDeploymentClick} loading={isLoading}>
      Get started
    </Button>
  )
}
