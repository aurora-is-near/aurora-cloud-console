import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Silo, SiloConfigTransactionStatus, Team } from "@/types/types"
import { setBaseToken } from "@/actions/deployment/set-base-token"
import { logger } from "@/logger"
import { updateSilo } from "@/actions/silos/update-silo"
import { ListProgressState } from "@/uikit"
import { useSteps } from "../hooks"
import { Steps } from "./Steps"
import { Step, StepName } from "../types"

type DeploymentStepsProps = {
  team: Team
  silo: Silo
  siloBaseTokenTransactionStatus?: SiloConfigTransactionStatus
  onDeploymentComplete: () => void
}

const STEPS: StepName[] = [
  "CONFIGURED_CHAIN",
  "INIT_AURORA_ENGINE",
  "SETTING_BASE_TOKEN",
  "START_BLOCK_EXPLORER",
  "CHAIN_DEPLOYED",
]

const CURRENT_STEP_DEFAULT_STATE: ListProgressState = "pending"

const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay)
  })

const isStepCompleted = (step: StepName, currentStep: StepName) =>
  STEPS.indexOf(step) < STEPS.indexOf(currentStep) ||
  currentStep === "CHAIN_DEPLOYED"

export const DeploymentSteps = ({
  team,
  silo,
  siloBaseTokenTransactionStatus,
  onDeploymentComplete,
}: DeploymentStepsProps) => {
  const wasConfigurationStarted = useRef(false)

  // The initial state accounts for the case where the user started a
  // transaction to set the base token then navigated away from the page. In
  // this case we want to jump straight to the relevant step and state.
  const [currentStepState, setCurrentStepState] = useState<ListProgressState>(
    () => {
      if (!siloBaseTokenTransactionStatus) {
        return CURRENT_STEP_DEFAULT_STATE
      }

      if (siloBaseTokenTransactionStatus === "FAILED") {
        return "failed"
      }

      if (siloBaseTokenTransactionStatus === "PENDING") {
        return "pending"
      }

      return "completed"
    },
  )

  const [currentStep, setCurrentStep] = useState<StepName>(() => {
    if (!siloBaseTokenTransactionStatus) {
      return "INIT_AURORA_ENGINE"
    }

    if (siloBaseTokenTransactionStatus === "SUCCESSFUL") {
      return "START_BLOCK_EXPLORER"
    }

    return "SETTING_BASE_TOKEN"
  })

  const steps = useMemo(() => {
    return STEPS.map((step, index): Step => {
      if (
        STEPS.indexOf(currentStep) > index ||
        currentStep === "CHAIN_DEPLOYED"
      ) {
        return { name: step, state: "completed" }
      }

      if (step === currentStep) {
        return { name: step, state: currentStepState }
      }

      return { name: step, state: "upcoming" }
    })
  }, [currentStep, currentStepState])

  const startConfiguration = useCallback(async () => {
    // A guard against starting the configuration process multiple times, for
    // example, if a re-render causes the `useEffect` to run again.
    if (wasConfigurationStarted.current) {
      return
    }

    wasConfigurationStarted.current = true

    // Start with a little delay while pretending to initialize the Aurora engine.
    if (!isStepCompleted("INIT_AURORA_ENGINE", currentStep)) {
      await sleep(2500)
    }

    // Set the base token
    if (!isStepCompleted("SETTING_BASE_TOKEN", currentStep)) {
      setCurrentStep("SETTING_BASE_TOKEN")

      let setBaseTokenStatus: SiloConfigTransactionStatus = "PENDING"

      try {
        setBaseTokenStatus = await setBaseToken(silo)
      } catch (error) {
        logger.error(error)
        setCurrentStepState("failed")

        return
      }

      // If the transaction has failed we mark the step as failed and exit. It is
      // up the the user to hit retry.
      if (setBaseTokenStatus === "FAILED") {
        setCurrentStepState("failed")

        return
      }

      // If the transaction is pending we wait a little before setting to delayed
      // (to display another message in the UI), then we the process to check the
      // transaction again.
      if (setBaseTokenStatus === "PENDING") {
        await sleep(10000)
        setCurrentStepState("delayed")
        await startConfiguration()

        return
      }
    }

    // "Start" the block explorer.
    if (!isStepCompleted("START_BLOCK_EXPLORER", currentStep)) {
      setCurrentStep("START_BLOCK_EXPLORER")
      await sleep(2500)
    }

    // If the above process succeeds we consider the deployment complete and
    // mark the silo as active.
    await updateSilo(silo.id, { is_active: true })
    setCurrentStep("CHAIN_DEPLOYED")
  }, [currentStep, silo])

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
        setCurrentStepState(CURRENT_STEP_DEFAULT_STATE)
        await startConfiguration()
      }
    },
  })

  return <Steps allSteps={allSteps} steps={steps} />
}
