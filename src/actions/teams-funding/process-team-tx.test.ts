import { getCryptoOrders } from "@/actions/orders/get-crypto-orders"
import { updateTeam } from "@/actions/teams/update-team"
import { addOrder } from "@/actions/orders/add-order"
import { createMockTeam } from "../../../test-utils/factories/team-factory"
import * as processTeamTxModule from "./process-team-tx"

jest.mock("@/actions/orders/get-crypto-orders")
jest.mock("@/actions/teams/update-team")
jest.mock("@/actions/orders/add-order")
jest.mock("@/logger")

global.fetch = jest.fn()

describe("processTeamTx", () => {
  it("should do nothing if no funding wallet address is provided", async () => {
    const team = createMockTeam({
      funding_wallet_address: undefined,
    })

    await processTeamTxModule.processTeamTx(team)

    // global.fetch is aurora blockscout API call
    expect(global.fetch).not.toHaveBeenCalled()
    expect(getCryptoOrders).not.toHaveBeenCalled()
  })

  it("should do nothing if no inflows are found", async () => {
    const team = createMockTeam({
      funding_wallet_address: "0xTEST",
    })

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        status: "1",
        message: "OK",
        result: [],
      }),
    })

    await processTeamTxModule.processTeamTx(team)

    // aurora blockscout API call
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("0xTEST"))
    expect(getCryptoOrders).not.toHaveBeenCalled()
  })

  it("should process all transactions when there are no existing orders", async () => {
    const team = createMockTeam({
      id: 1,
      funding_wallet_address: "0xTEST",
      prepaid_transactions: 5,
    })

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        status: "1",
        message: "OK",
        result: [
          {
            hash: "0xTX1",
            to: "0xTEST",
            value: "10000000", // 10 USDT with 6 decimals
            contractAddress: "0x80da25da4d783e57d2fcda0436873a193a4beccf",
            tokenSymbol: "USDT",
            tokenDecimal: "6",
          },
          {
            hash: "0xTX2",
            to: "0xTEST",
            value: "20000000",
            contractAddress: "0x80da25da4d783e57d2fcda0436873a193a4beccf",
            tokenSymbol: "USDT",
            tokenDecimal: "6",
          },
          // This transaction should be ignored
          {
            hash: "0xTX2",
            to: "0xTEST",
            value: "20000000",
            contractAddress: "0x9bFafdB4a5446f9F3753bABE083A86cE85d59715", // wrong contract address
            tokenSymbol: "USDT",
            tokenDecimal: "6",
          },
        ],
      }),
    })
    ;(getCryptoOrders as jest.Mock).mockResolvedValueOnce([])

    await processTeamTxModule.processTeamTx(team)

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("0xTEST"))
    expect(getCryptoOrders).toHaveBeenCalledWith(1)

    // Check the expected behavior based on txAmount calculated from USDT values
    // and TX_COST_USDT constant in your app
    expect(addOrder).toHaveBeenCalledTimes(2)
    expect(updateTeam).toHaveBeenCalledTimes(2)
  })

  it("should process transactions until finding an existing one", async () => {
    const team = createMockTeam({
      id: 1,
      funding_wallet_address: "0xTEST",
      prepaid_transactions: 5,
    })

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        status: "1",
        message: "OK",
        result: [
          {
            hash: "0xNEW1",
            to: "0xTEST",
            value: "10000000",
            contractAddress: "0x80da25da4d783e57d2fcda0436873a193a4beccf",
            tokenSymbol: "USDT",
            tokenDecimal: "6",
          },
          {
            hash: "0xNEW2",
            to: "0xTEST",
            value: "20000000",
            contractAddress: "0x80da25da4d783e57d2fcda0436873a193a4beccf",
            tokenSymbol: "USDT",
            tokenDecimal: "6",
          },
          {
            hash: "0xEXISTING",
            to: "0xTEST",
            value: "30000000",
            contractAddress: "0x80da25da4d783e57d2fcda0436873a193a4beccf",
            tokenSymbol: "USDT",
            tokenDecimal: "6",
          },
          {
            hash: "0xOLD",
            to: "0xTEST",
            value: "40000000",
            contractAddress: "0x80da25da4d783e57d2fcda0436873a193a4beccf",
            tokenSymbol: "USDT",
            tokenDecimal: "6",
          },
        ],
      }),
    })
    ;(getCryptoOrders as jest.Mock).mockResolvedValueOnce([
      { tx_hash: "0xEXISTING" },
    ])

    await processTeamTxModule.processTeamTx(team)

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("0xTEST"))
    expect(getCryptoOrders).toHaveBeenCalledWith(1)

    // Should only process the first two transactions
    expect(addOrder).toHaveBeenCalledTimes(2)
    expect(addOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        tx_hash: "0xNEW1",
      }),
    )
    expect(addOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        tx_hash: "0xNEW2",
      }),
    )

    // Verify existing and old transactions were not processed
    expect(addOrder).not.toHaveBeenCalledWith(
      expect.objectContaining({
        tx_hash: "0xEXISTING",
      }),
    )
    expect(addOrder).not.toHaveBeenCalledWith(
      expect.objectContaining({
        tx_hash: "0xOLD",
      }),
    )
  })
})
