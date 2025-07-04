import type { ReactNode } from "react"

import type { ListProgressState } from "@/uikit"

type DeploymentStepAction = {
  title: string
  icon?: ReactNode
  variant: "border" | "primary" | "secondary" | "destructive"
  disabled?: boolean
  onClick?: () => void
}

type DeploymentStep = {
  title: string
  state: ListProgressState
  description?: string
  action?: DeploymentStepAction
}

const stepNames = [
  "CONFIGURE_CHAIN",
  "CONFIGURED_CHAIN",
  "START_DEPLOYMENT",
  "INIT_AURORA_ENGINE",
  "SETTING_BASE_TOKEN",
  "DEPLOYING_DEFAULT_TOKENS",
  "CONFIGURING_CONSOLE",
  "CHAIN_DEPLOYED",
  "MANUAL_DEPLOYMENT",
] as const

export type StepName = (typeof stepNames)[number]

export type StepsAttrs = Record<
  StepName,
  { title: string } & {
    [key in ListProgressState | "title"]?: Partial<
      Omit<DeploymentStep, "state">
    >
  }
>

export type Step = { name: StepName; state: ListProgressState }
