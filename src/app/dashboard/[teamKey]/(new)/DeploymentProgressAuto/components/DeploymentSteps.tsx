import { useCallback, useEffect, useMemo, useState } from "react"
import { Silo, Team } from "@/types/types"
import { setBaseToken } from "@/actions/deployment/set-base-token"
import { logger } from "@/logger"
import { updateSilo } from "@/actions/silos/update-silo"
import { useSteps } from "../hooks"
import { Steps } from "./Steps"
import { Step, StepName } from "../types"

type DeploymentStepsProps = {
  team: Team
  silo: Silo
  onDeploymentComplete: () => void
}

const STEPS: StepName[] = [
  "CONFIGURED_CHAIN",
  "INIT_AURORA_ENGINE",
  "SETTING_BASE_TOKEN",
  "START_BLOCK_EXPLORER",
  "CHAIN_DEPLOYED",
]

const STEP_DELAY = 2500

const sleep = () =>
  new Promise((resolve) => {
    setTimeout(resolve, STEP_DELAY)
  })

export const DeploymentSteps = ({
  team,
  silo,
  onDeploymentComplete,
}: DeploymentStepsProps) => {
  const [hasError, setHasError] = useState(false)
  const [currentStep, setCurrentStep] = useState<StepName>("INIT_AURORA_ENGINE")

  const steps = useMemo(() => {
    return STEPS.map((step, index): Step => {
      if (
        STEPS.indexOf(currentStep) > index ||
        currentStep === "CHAIN_DEPLOYED"
      ) {
        return { name: step, state: "completed" }
      }

      if (step === currentStep) {
        return { name: step, state: hasError ? "failed" : "pending" }
      }

      return { name: step, state: "upcoming" }
    })
  }, [currentStep, hasError])

  const startConfiguration = useCallback(async () => {
    await sleep()

    setCurrentStep("SETTING_BASE_TOKEN")

    let isBaseTokenSet

    try {
      isBaseTokenSet = await setBaseToken(silo)
    } catch (error) {
      logger.error(error)
      setHasError(true)

      return
    }

    if (!isBaseTokenSet) {
      return
    }

    await sleep()

    setCurrentStep("START_BLOCK_EXPLORER")

    await sleep()

    // If the above process succeeds we consider the deployment complete and
    // mark the silo as active
    await updateSilo(silo.id, { is_active: true })
    setCurrentStep("CHAIN_DEPLOYED")
  }, [silo])

  useEffect(() => {
    void startConfiguration()
  }, [startConfiguration])

  const allSteps = useSteps({
    team,
    onClick: async (step) => {
      if (step.name === "CHAIN_DEPLOYED" && step.state === "completed") {
        onDeploymentComplete()
      }

      if (step.name === "SETTING_BASE_TOKEN" && step.state === "failed") {
        setHasError(false)
        await startConfiguration()
      }
    },
  })

  return <Steps allSteps={allSteps} steps={steps} />
}
