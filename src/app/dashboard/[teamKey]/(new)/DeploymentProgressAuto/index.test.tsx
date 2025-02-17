import { render, screen, within } from "@testing-library/react"
import { DeploymentProgressAuto } from "./index"
import { mockTeam } from "../../../../../../test-utils/mock-team"
import { createWrapper } from "../../../../../../test-utils/create-wrapper"
import { createMockSilo } from "../../../../../../test-utils/factories/silo-factory"

describe("DeploymentProgressAuto", () => {
  it("shows the expected welcome steps", async () => {
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

    const steps = screen.getByTestId("deployment-steps")

    expect(
      within(steps).getByText(/Configure your virtual chain/i),
    ).not.toBeNull()

    expect(
      within(steps).getByText(/Start automatic deployment/i),
    ).not.toBeNull()
  })

  it("shows the expected onboarding passed steps", async () => {
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

    const steps = screen.getByTestId("deployment-steps")

    expect(
      within(steps).getByText(/Configure your virtual chain/i),
    ).not.toBeNull()

    expect(
      within(steps).getByText(/Start automatic deployment/i),
    ).not.toBeNull()
  })

  it("shows the expected deployment in progress steps", async () => {
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

    const steps = screen.getByTestId("deployment-steps")

    expect(
      within(steps).getByText(/Initializing the Aurora engine/i),
    ).not.toBeNull()

    expect(within(steps).getByText(/Setting up the base token/i)).not.toBeNull()

    expect(
      within(steps).getByText(/Starting your Block Explorer/i),
    ).not.toBeNull()

    expect(
      within(steps).getByText(/Chain successfully deployed/i),
    ).not.toBeNull()
  })

  it("shows the expected content when deployment is complete", async () => {
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
