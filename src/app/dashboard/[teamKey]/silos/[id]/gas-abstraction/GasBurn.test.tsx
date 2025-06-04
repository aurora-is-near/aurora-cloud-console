import { fireEvent, render, screen, within } from "@testing-library/react"

import { getSilo } from "@/actions/silos/get-silo"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { updateSilo } from "@/actions/silos/update-silo"
import { getLastDayOfMonth } from "@/utils/dates/get-last-day-of-month"
import { getMonthsList } from "@/utils/dates/get-months-list"
import { queryClient } from "@/providers/QueryProvider"

import { createWrapper } from "../../../../../../../test-utils/create-wrapper"
import { createMockSilo } from "../../../../../../../test-utils/factories/silo-factory"
import { createMockTeam } from "../../../../../../../test-utils/factories/team-factory"

import GasAbstractionPage from "./page"

const team = createMockTeam()
const silo = createMockSilo({
  gas_burn_percent: 5,
})

jest.useFakeTimers()

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => new URLSearchParams("tab=gas-collected")),
  usePathname: () =>
    `/dashboard/${team.team_key}/silos/${silo.id}/configuration`,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

// mock server actions
jest.mock("../../../../../../actions/teams/get-team-by-key")
jest.mock("../../../../../../actions/silos/update-silo")
jest.mock("../../../../../../actions/silos/get-silo")

// mock collected gas chart data
const monthsList = getMonthsList(silo.created_at)
const startDate = monthsList[monthsList.length - 1].value

describe("GasBurn", () => {
  beforeEach(() => {
    ;(getSilo as jest.Mock).mockResolvedValue(silo)
    ;(getTeamByKey as jest.Mock).mockResolvedValue(team)

    queryClient.setQueryData(["getSiloCollectedGasTotal", { id: silo.id }], {
      count: 0.001,
    })

    queryClient.setQueryData(
      [
        "getSiloCollectedGas",
        {
          startDate,
          endDate: getLastDayOfMonth(startDate),
          id: silo.id,
        },
      ],
      { items: [] },
    )
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it("renders gas burn amount", async () => {
    render(<GasAbstractionPage />, {
      wrapper: createWrapper({
        siloContext: {
          silo: { ...silo, gas_burn_percent: 5 },
        },
        teamContext: { team },
      }),
    })

    const card = screen.getByTestId("gas-mechanics-card")
    const gasBurnItem = await within(card).findByLabelText(/Gas burn/)
    const gasBurnValue =
      await within(gasBurnItem).findByText(/5% of collected gas/)

    expect(gasBurnValue).toBeInTheDocument()

    const editBtn = within(gasBurnItem).queryByLabelText("Edit")

    expect(editBtn).toBeInTheDocument()
  })

  it("enter wrong gas burn percentage", async () => {
    render(<GasAbstractionPage />, {
      wrapper: createWrapper({
        siloContext: { silo },
        teamContext: { team },
      }),
    })

    const card = screen.getByTestId("gas-mechanics-card")
    const gasBurnItem = await within(card).findByLabelText(/Gas burn/)

    const editBtn = await within(gasBurnItem).findByLabelText("Edit")

    fireEvent.click(editBtn)

    const amountInput = await screen.findByLabelText(/Set gas burn rate/)

    expect(amountInput).toBeInTheDocument()

    fireEvent.change(amountInput, {
      target: { value: "122" },
    })

    const updateBtn = await screen.findByRole("button", {
      name: /Update/,
    })

    fireEvent.click(updateBtn)

    expect(updateSilo).not.toHaveBeenCalled()
  })

  it("enter correct gas burn percentage", async () => {
    render(<GasAbstractionPage />, {
      wrapper: createWrapper({
        siloContext: { silo },
        teamContext: { team },
      }),
    })

    const card = screen.getByTestId("gas-mechanics-card")
    const gasBurnItem = await within(card).findByLabelText(/Gas burn/)

    const editBtn = await within(gasBurnItem).findByLabelText("Edit")

    fireEvent.click(editBtn)

    const amountInput = await screen.findByLabelText(/Set gas burn rate/)

    fireEvent.change(amountInput, {
      target: { value: "10" },
    })

    const updateBtn = await screen.findByRole("button", {
      name: /Update/,
    })

    fireEvent.click(updateBtn)
    await screen.findByText(/Gas burn percentage updated/)

    expect(updateSilo).toHaveBeenCalledTimes(1)
    expect(updateSilo).toHaveBeenCalledWith(silo.id, {
      gas_burn_percent: 10,
    })
  })
})
