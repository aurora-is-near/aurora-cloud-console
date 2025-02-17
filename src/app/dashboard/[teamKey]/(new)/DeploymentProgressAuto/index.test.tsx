import { render, screen, within } from "@testing-library/react"
import { DeploymentProgressAuto } from "./index"
import { mockTeam } from "../../../../../../test-utils/mock-team"
import { createWrapper } from "../../../../../../test-utils/create-wrapper"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"

const getSteps = () => {
  const steps = screen.getAllByTestId("deployment-step")

  return steps.map((step) => {
    return {
      id: step.id,
      isSelected: step.getAttribute("aria-current") === "step",
    }
  })
}

describe("DeploymentProgressAuto", () => {
  describe("welcome", () => {
    it("shows the expected steps", async () => {
      render(
        <DeploymentProgressAuto
          team={mockTeam}
          silo={null}
          isOnboardingFormSubmitted={false}
          isDeploymentComplete={false}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      expect(getSteps()).toEqual([
        {
          id: "CONFIGURE_CHAIN",
          isSelected: true,
        },
        {
          id: "START_DEPLOYMENT",
          isSelected: false,
        },
      ])
    })
  })

  describe("onboarding", () => {
    it("shows the expected steps", async () => {
      render(
        <DeploymentProgressAuto
          team={mockTeam}
          silo={null}
          isOnboardingFormSubmitted
          isDeploymentComplete={false}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      expect(getSteps()).toEqual([
        {
          id: "CONFIGURE_CHAIN",
          isSelected: false,
        },
        {
          id: "START_DEPLOYMENT",
          isSelected: true,
        },
      ])
    })
  })

  describe("deployment in progress", () => {
    it("shows the expected steps", async () => {
      render(
        <DeploymentProgressAuto
          team={mockTeam}
          silo={createMockSilo({ is_active: true })}
          isOnboardingFormSubmitted
          isDeploymentComplete={false}
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      expect(getSteps()).toEqual([
        {
          id: "CONFIGURED_CHAIN",
          isSelected: false,
        },
        {
          id: "INIT_AURORA_ENGINE",
          isSelected: false,
        },
        {
          id: "SETTING_BASE_TOKEN",
          isSelected: false,
        },
        {
          id: "START_BLOCK_EXPLORER",
          isSelected: false,
        },
        {
          id: "CHAIN_DEPLOYED",
          isSelected: false,
        },
      ])
    })
  })

  describe("deployment complete", () => {
    it("shows the expected content", async () => {
      render(
        <DeploymentProgressAuto
          team={mockTeam}
          silo={createMockSilo({ is_active: true })}
          isOnboardingFormSubmitted
          isDeploymentComplete
          setIsDeploymentComplete={() => {}}
        />,
        { wrapper: createWrapper() },
      )

      expect(screen.queryByTestId("deployment-steps")).toBeNull()
      expect(screen.getByText(/Open Block Explorer/i)).not.toBeNull()
    })
  })
})
