import type { ComponentProps } from "react"

import { Button } from "@/components/Button"
import { ListProgress } from "@/uikit"
import type { ListProgressState } from "@/uikit"

import { useSteps } from "../hooks/useSteps"

const StepAction = (props: ComponentProps<typeof Button>) => (
  <Button {...props} size="md" />
)

type Props = {
  allSteps: ReturnType<typeof useSteps>
  steps: { name: keyof ReturnType<typeof useSteps>; state: ListProgressState }[]
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
