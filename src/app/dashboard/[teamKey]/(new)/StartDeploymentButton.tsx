"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/Button"
import { logger } from "@/logger"
import { assignSiloToTeam } from "@/actions/deployment/assign-silo-to-team"
import { OnboardingForm, Silo, Team } from "@/types/types"

type StartDeploymentButtonProps = {
  team: Team
  onboardingForm: OnboardingForm
}

export const StartDeploymentButton = ({
  team,
  onboardingForm,
}: StartDeploymentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  /**
   * Start deployment by assigning a silo to the team.
   *
   * We are navigated to the silo page, where the deployment process continues.
   */
  const startDeployment = async () => {
    setIsLoading(true)

    let silo: Silo | null = null

    try {
      silo = await assignSiloToTeam(team.id)
    } catch (error) {
      logger.error(error)
      setIsLoading(false)

      return
    }

    setIsLoading(false)
    router.push(`/dashboard/${team.team_key}/silos/${silo.id}`)
  }

  return (
    <Button onClick={startDeployment} loading={isLoading}>
      Deploy now
    </Button>
  )
}
