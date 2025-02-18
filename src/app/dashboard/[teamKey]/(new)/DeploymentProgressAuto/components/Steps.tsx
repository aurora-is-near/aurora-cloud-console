import type { ComponentProps } from "react"

import { Button } from "@/components/Button"
import { ListProgress } from "@/uikit"

import { Step, StepsAttrs } from "../types"

const StepAction = (props: ComponentProps<typeof Button>) => (
  <Button {...props} size="md" />
)

type Props = {
  allSteps: StepsAttrs
  steps: Step[]
}

export const Steps = ({ steps, allSteps }: Props) => (
  <ListProgress>
    {steps.map(({ name, state }) => (
      <ListProgress.Item
        key={name}
        state={state}
        title={allSteps[name].title}
        {...allSteps[name][state]}
      >
        {allSteps[name][state]?.action && (
          <StepAction {...allSteps[name][state].action} />
        )}
      </ListProgress.Item>
    ))}
  </ListProgress>
)
