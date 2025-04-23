import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"

import { getSilo } from "@/actions/silos/get-silo"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { updateSilo } from "@/actions/silos/update-silo"
import { collectGasToNear } from "@/actions/silo-gas/collect-gas-to-near"
import { getLastDayOfMonth } from "@/utils/dates/get-last-day-of-month"
import { getMonthsList } from "@/utils/dates/get-months-list"
import { queryClient } from "@/providers/QueryProvider"
import { getNearAccount } from "@/utils/near-api/account"

import { createWrapper } from "../../../../../../../test-utils/create-wrapper"
import { createMockSilo } from "../../../../../../../test-utils/factories/silo-factory"
import { createMockTeam } from "../../../../../../../test-utils/factories/team-factory"
import { headlessUITransitionMock } from "../../../../../../../test-utils/mock-headless-ui-transition"

import GasAbstractionPage from "./page"

const team = createMockTeam()
const silo = createMockSilo({
  gas_collection_address: null,
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

jest.mock("@headlessui/react", () => {
  return headlessUITransitionMock(jest.requireActual("@headlessui/react"))
})

jest.mock("@/utils/near-api/account", () => ({
  getNearAccount: jest.fn(),
}))

// mock server actions
jest.mock("../../../../../../actions/silo-gas/collect-gas-to-near")
jest.mock("../../../../../../actions/teams/get-team-by-key")
jest.mock("../../../../../../actions/silos/update-silo")
jest.mock("../../../../../../actions/silos/get-silo")

// mock collected gas chart data
const monthsList = getMonthsList(silo.created_at)
const startDate = monthsList[monthsList.length - 1].value

describe("CollectGas", () => {
  beforeEach(() => {
    ;(getSilo as jest.Mock).mockResolvedValue(silo)
    ;(getTeamByKey as jest.Mock).mockResolvedValue(team)
    ;(collectGasToNear as jest.Mock).mockResolvedValue("PENDING")

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

  it("renders no collection address set", async () => {
    render(<GasAbstractionPage />, {
      wrapper: createWrapper({
        siloContext: {
          silo: { ...silo, gas_collection_address: null },
        },
        teamContext: { team },
      }),
    })

    // check that address is not set
    const gasCollectItem = await screen.findByLabelText(
      /Gas collection address/,
    )

    const gasCollectionNoAddress =
      await within(gasCollectItem).findByText(/Not set/)

    expect(gasCollectionNoAddress).toBeInTheDocument()

    // copy action button is not present
    const copyAddressBtn = within(gasCollectItem).queryByRole("button", {
      name: /Copy to clipboard/,
    })

    expect(copyAddressBtn).not.toBeInTheDocument()

    // edit action button is present
    const editAddressBtn = within(gasCollectItem).queryByLabelText("Edit")

    expect(editAddressBtn).toBeInTheDocument()

    // Collect button is disabled
    const gasBalanceItem = await screen.findByLabelText(/Gas balance/)

    expect(gasBalanceItem).toBeInTheDocument()

    const collectBtn = within(gasBalanceItem).queryByRole("button", {
      name: /Collect/,
    })

    expect(collectBtn).toBeInTheDocument()
    expect(collectBtn).toBeDisabled()
  })

  it("collect button is disabled when no gas available", async () => {
    queryClient.setQueryData(["getSiloCollectedGasTotal", { id: silo.id }], {
      count: 0,
    })

    render(<GasAbstractionPage />, {
      wrapper: createWrapper({
        siloContext: { silo: { ...silo, gas_collection_address: "test.near" } },
        teamContext: { team },
      }),
    })

    // Collect button is disabled
    const gasBalanceItem = await screen.findByLabelText(/Gas balance/)

    expect(gasBalanceItem).toBeInTheDocument()

    const collectBtn = within(gasBalanceItem).queryByRole("button", {
      name: /Collect/,
    })

    expect(collectBtn).toBeInTheDocument()
    expect(collectBtn).toBeDisabled()
  })

  it("renders with collection address set", async () => {
    render(<GasAbstractionPage />, {
      wrapper: createWrapper({
        siloContext: { silo: { ...silo, gas_collection_address: "test.near" } },
        teamContext: { team },
      }),
    })

    // Collect button is enabled
    const gasBalanceItem = await screen.findByLabelText(/Gas balance/)

    expect(gasBalanceItem).toBeInTheDocument()

    const collectBtn = within(gasBalanceItem).queryByRole("button", {
      name: /Collect/,
    })

    expect(collectBtn).toBeInTheDocument()
    expect(collectBtn).toBeEnabled()
  })

  it("enter wrong Near address", async () => {
    ;(getNearAccount as jest.Mock).mockRejectedValue(
      new Error("Mocked failure"),
    )

    render(<GasAbstractionPage />, {
      wrapper: createWrapper({
        siloContext: { silo },
        teamContext: { team },
      }),
    })

    const gasCollectItem = await screen.findByLabelText(
      /Gas collection address/,
    )

    const editAddressBtn = await within(gasCollectItem).findByLabelText("Edit")

    fireEvent.click(editAddressBtn)

    await screen.findByText(/Enter the NEAR address to withdraw gas to/)
    const addressInput = await screen.findByPlaceholderText(
      /Near account ID to send collected gas to/,
    )

    fireEvent.change(addressInput, {
      target: { value: "test.near" },
    })

    const updateBtn = await screen.findByRole("button", {
      name: /Update/,
    })

    fireEvent.click(updateBtn)

    expect(
      await screen.findByText(/Invalid Near Account ID/),
    ).toBeInTheDocument()
  })

  it("enter correct Near address", async () => {
    ;(getNearAccount as jest.Mock).mockResolvedValue({
      state: jest.fn().mockResolvedValue({ accountId: "test.near" }),
    })

    render(<GasAbstractionPage />, {
      wrapper: createWrapper({
        siloContext: { silo },
        teamContext: { team },
      }),
    })

    const gasCollectItem = await screen.findByLabelText(
      /Gas collection address/,
    )

    const editAddressBtn = await within(gasCollectItem).findByLabelText("Edit")

    fireEvent.click(editAddressBtn)

    await screen.findByText(/Enter the NEAR address to withdraw gas to/)
    const addressInput = await screen.findByPlaceholderText(
      /Near account ID to send collected gas to/,
    )

    fireEvent.change(addressInput, {
      target: { value: "test.near" },
    })

    const updateBtn = await screen.findByRole("button", {
      name: /Update/,
    })

    fireEvent.click(updateBtn)
    await screen.findByText(/Gas collection address added successfully/)

    expect(getNearAccount).toHaveBeenCalledTimes(1)
    expect(getNearAccount).toHaveBeenCalledWith("test.near")

    expect(updateSilo).toHaveBeenCalledTimes(1)
    expect(updateSilo).toHaveBeenCalledWith(silo.id, {
      gas_collection_address: "test.near",
    })
  })

  it("collect gas", async () => {
    render(<GasAbstractionPage />, {
      wrapper: createWrapper({
        siloContext: { silo: { ...silo, gas_collection_address: "test.near" } },
        teamContext: { team },
      }),
    })

    // Collect button is enabled
    const gasBalanceItem = await screen.findByLabelText(/Gas balance/)

    expect(gasBalanceItem).toBeInTheDocument()

    const collectBtn = await within(gasBalanceItem).findByRole("button", {
      name: /Collect/,
    })

    fireEvent.click(collectBtn)
    await screen.findByText(/Are you sure you want to withdraw gas/)
    const confirmBtn = await screen.findByRole("button", {
      name: /Collect gas/,
    })

    fireEvent.click(confirmBtn)

    await waitFor(() => {
      screen.getByText(/Collected gas was sent to your account/)
    })

    expect(collectGasToNear).toHaveBeenCalledTimes(1)
    expect(collectGasToNear).toHaveBeenCalledWith({
      amount: "1000000000000000",
      silo: {
        ...silo,
        gas_collection_address: "test.near",
      },
    })
  })
})
