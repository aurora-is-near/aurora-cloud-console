import { render, screen } from "@testing-library/react"
import { DashboardHomePage } from "./Dashboard"
import { createWrapper } from "../../../../../test-utils/create-wrapper"
import { createMockSilo } from "../../../../../test-utils/factories/silo-factory"
import { mockTeam } from "../../../../../test-utils/mock-team"

describe("Dashboard", () => {
  it("shows the expected content when deployment is complete", async () => {
    render(<DashboardHomePage />, {
      wrapper: createWrapper({
        siloContext: { silo: createMockSilo({ is_active: true }) },
        teamContext: { team: mockTeam },
      }),
    })

    expect(screen.getByText(/Open Block Explorer/i)).not.toBeNull()
    expect(screen.queryByTestId("deployment-steps")).toBeNull()
  })
})
