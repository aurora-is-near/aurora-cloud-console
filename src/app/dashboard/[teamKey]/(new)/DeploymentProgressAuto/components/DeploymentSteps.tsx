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
  const [currentStep, setCurrentStep] = useState<{
    name: StepName
    state: ListProgressState
  }>(() => {
    if (!siloBaseTokenTransactionStatus) {
      return { name: "INIT_AURORA_ENGINE", state: CURRENT_STEP_DEFAULT_STATE }
    }

    if (siloBaseTokenTransactionStatus === "SUCCESSFUL") {
      return { name: "START_BLOCK_EXPLORER", state: "pending" }
    }

    if (siloBaseTokenTransactionStatus === "FAILED") {
      return { name: "SETTING_BASE_TOKEN", state: "failed" }
    }

    if (siloBaseTokenTransactionStatus === "PENDING") {
      return { name: "SETTING_BASE_TOKEN", state: "pending" }
    }

    return { name: "SETTING_BASE_TOKEN", state: "completed" }
  })

  const steps = useMemo(() => {
    return STEPS.map((step, index): Step => {
      if (
        STEPS.indexOf(currentStep.name) > index ||
        currentStep.name === "CHAIN_DEPLOYED"
      ) {
        return { name: step, state: "completed" }
      }

      if (step === currentStep.name) {
        return { name: step, state: currentStep.state }
      }

      return { name: step, state: "upcoming" }
    })
  }, [currentStep])

  const startConfiguration = useCallback(async () => {
    // Start with a little delay while pretending to initialize the Aurora engine.
    if (!isStepCompleted("INIT_AURORA_ENGINE", currentStep.name)) {
      await sleep(2500)
    }

    // Set the base token
    if (!isStepCompleted("SETTING_BASE_TOKEN", currentStep.name)) {
      setCurrentStep({
        name: "SETTING_BASE_TOKEN",
        state: "pending",
      })

      let setBaseTokenStatus: SiloConfigTransactionStatus = "PENDING"

      try {
        setBaseTokenStatus = await setBaseToken(silo)
      } catch (error) {
        logger.error(error)
        setCurrentStep({
          name: "SETTING_BASE_TOKEN",
          state: "failed",
        })

        return
      }

      // If the transaction has failed we mark the step as failed and exit. It is
      // up the the user to hit retry.
      if (setBaseTokenStatus === "FAILED") {
        setCurrentStep({
          name: "SETTING_BASE_TOKEN",
          state: "failed",
        })

        return
      }

      // If the transaction is pending we wait a little before setting to delayed
      // (to display another message in the UI), then we the process to check the
      // transaction again.
      if (setBaseTokenStatus === "PENDING") {
        await sleep(10000)
        setCurrentStep({
          name: "SETTING_BASE_TOKEN",
          state: "delayed",
        })

        await startConfiguration()

        return
      }
    }

    // "Start" the block explorer.
    if (!isStepCompleted("START_BLOCK_EXPLORER", currentStep.name)) {
      setCurrentStep({
        name: "START_BLOCK_EXPLORER",
        state: "pending",
      })
      await sleep(2500)
    }

    // If the above process succeeds we consider the deployment complete and
    // mark the silo as active.
    await updateSilo(silo.id, { is_active: true })
    setCurrentStep({
      name: "CHAIN_DEPLOYED",
      state: "completed",
    })
  }, [currentStep, silo])

  // Start the configuration on mount.
  useEffect(() => {
    if (wasConfigurationStarted.current) {
      return
    }

    // A guard against starting the configuration process multiple times, for
    // example, if a re-render causes the `useEffect` to run again.
    wasConfigurationStarted.current = true

    void startConfiguration()
  }, [startConfiguration])

  const allSteps = useSteps({
    team,
    onClick: async (step) => {
      if (step.name === "CHAIN_DEPLOYED" && step.state === "completed") {
        onDeploymentComplete()
      }

      if (step.name === "SETTING_BASE_TOKEN" && step.state === "failed") {
        setCurrentStep({
          name: "SETTING_BASE_TOKEN",
          state: "pending",
        })

        await startConfiguration()
      }
    },
  })

  return <Steps allSteps={allSteps} steps={steps} />
}
