import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Silo,
  SiloConfigTransactionOperation,
  SiloConfigTransactionStatus,
  Team,
} from "@/types/types"
import { setBaseToken } from "@/actions/deployment/set-base-token"
import { logger } from "@/logger"
import { updateSilo } from "@/actions/silos/update-silo"
import { ListProgressState } from "@/uikit"
import { SiloConfigTransactionStatuses } from "@/types/silo-config-transactions"
import { deployDefaultTokens } from "@/actions/deployment/deploying-default-tokens"
import { DEFAULT_SILO_CONFIG_TRANSACTION_STATUSES } from "@/constants/silo-config-transactions"
import { useSteps } from "../hooks"
import { Steps } from "./Steps"
import { Step, StepName } from "../types"

type DeploymentStepsProps = {
  team: Team
  silo: Silo
  siloTransactionStatuses?: SiloConfigTransactionStatuses
  onDeploymentComplete: () => void
}

const STEPS: StepName[] = [
  "CONFIGURED_CHAIN",
  "INIT_AURORA_ENGINE",
  "SETTING_BASE_TOKEN",
  "DEPLOYING_DEFAULT_TOKENS",
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
  siloTransactionStatuses,
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
    const transactionStatuses = {
      ...DEFAULT_SILO_CONFIG_TRANSACTION_STATUSES,
      ...siloTransactionStatuses,
    }

    const noTransactions = Object.values(siloTransactionStatuses ?? {}).every(
      (status) => !status,
    )

    // If there have been no transactions we start from the beginning.
    if (noTransactions) {
      return { name: "INIT_AURORA_ENGINE", state: CURRENT_STEP_DEFAULT_STATE }
    }

    const tokenDeploymentTransactionStatuses = Object.keys(transactionStatuses)
      .filter((key): key is SiloConfigTransactionOperation =>
        key.startsWith("DEPLOY_"),
      )
      .map((key) => siloTransactionStatuses?.[key])

    const allTransactionsSuccessful = Object.values(transactionStatuses).every(
      (status) => status === "SUCCESSFUL",
    )

    // If all transactions are successful we jump ahead to the start block
    // explorer step.
    if (allTransactionsSuccessful) {
      return { name: "START_BLOCK_EXPLORER", state: "pending" }
    }

    if (siloTransactionStatuses?.SET_BASE_TOKEN === "FAILED") {
      return { name: "SETTING_BASE_TOKEN", state: "failed" }
    }

    if (siloTransactionStatuses?.SET_BASE_TOKEN === "PENDING") {
      return { name: "SETTING_BASE_TOKEN", state: "pending" }
    }

    if (
      !tokenDeploymentTransactionStatuses.length ||
      tokenDeploymentTransactionStatuses.every((status) => !status)
    ) {
      return { name: "SETTING_BASE_TOKEN", state: "completed" }
    }

    if (tokenDeploymentTransactionStatuses.includes("FAILED")) {
      return { name: "DEPLOYING_DEFAULT_TOKENS", state: "failed" }
    }

    if (tokenDeploymentTransactionStatuses.includes("PENDING")) {
      return { name: "DEPLOYING_DEFAULT_TOKENS", state: "pending" }
    }

    return { name: "DEPLOYING_DEFAULT_TOKENS", state: "completed" }
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

  const runTransactionStep = useCallback(
    async (
      name: StepName,
      performTransaction: () => Promise<SiloConfigTransactionStatus>,
    ): Promise<ListProgressState> => {
      setCurrentStep({
        name,
        state: "pending",
      })

      let status: SiloConfigTransactionStatus = "PENDING"

      try {
        status = await performTransaction()
      } catch (error) {
        logger.error(error)
        setCurrentStep({
          name,
          state: "failed",
        })

        return "failed"
      }

      // If the transaction has failed we mark the step as failed and exit. It is
      // up the the user to hit retry.
      if (status === "FAILED") {
        setCurrentStep({
          name,
          state: "failed",
        })

        return "failed"
      }

      // If the transaction is pending we wait a little before setting to delayed
      // (to display another message in the UI), then we the process to check the
      // transaction again.
      if (status === "PENDING") {
        await sleep(10000)
        setCurrentStep({
          name,
          state: "delayed",
        })

        return "delayed"
      }

      return "completed"
    },
    [],
  )

  const startConfiguration = useCallback(async () => {
    // Start with a little delay while pretending to initialize the Aurora engine.
    if (!isStepCompleted("INIT_AURORA_ENGINE", currentStep.name)) {
      await sleep(2500)
    }

    // Set the base token
    if (!isStepCompleted("SETTING_BASE_TOKEN", currentStep.name)) {
      const status = await runTransactionStep("SETTING_BASE_TOKEN", () =>
        setBaseToken(silo),
      )

      if (status === "delayed") {
        await startConfiguration()

        return
      }

      if (status === "failed") {
        return
      }
    }

    // Deploy the default token contracts
    if (!isStepCompleted("DEPLOYING_DEFAULT_TOKENS", currentStep.name)) {
      const status = await runTransactionStep("DEPLOYING_DEFAULT_TOKENS", () =>
        deployDefaultTokens(silo),
      )

      if (status === "delayed") {
        await startConfiguration()

        return
      }

      if (status === "failed") {
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
  }, [currentStep.name, runTransactionStep, silo])

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
