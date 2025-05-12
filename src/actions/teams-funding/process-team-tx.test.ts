import {
  getFundingWalletTxs,
  AURORA_API_URL,
  AURORA_USDT_CONTRACT,
  TX_COST_USDT,
} from "./process-team-tx"

global.fetch = jest.fn()

describe("getFundingWalletTxs", () => {

  it('returns an empty array when API status is not "1"', async () => {
(fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        status: "0",
        message: "No transactions found",
        result: [],
      }),
    } as Response)

    const result = await getFundingWalletTxs("0xTESTADDRESS")

    expect(fetch).toHaveBeenCalledWith(
      `${AURORA_API_URL}?module=account&action=tokentx&address=0xTESTADDRESS&sort=desc`,
    )
    expect(result).toEqual([])
  })

  it("correctly filters and transforms USDT transactions", async () => {
    const mockTransactions = [
      {
        blockNumber: "1234567",
        timeStamp: "1620100000",
        hash: "0xTEST1",
        nonce: "1",
        blockHash: "0xBLOCKHASH1",
        transactionIndex: "0",
        from: "0xSENDER",
        to: "0xTESTADDRESS",
        value: "1000000",
        gas: "21000",
        gasPrice: "5000000000",
        isError: "0",
        txreceipt_status: "1",
        input: "0xDATA",
        contractAddress: AURORA_USDT_CONTRACT,
        tokenName: "Tether USD",
        tokenSymbol: "USDT",
        tokenDecimal: "6",
      },
      {
        blockNumber: "1234568",
        timeStamp: "1620100001",
        hash: "0xTEST2",
        nonce: "2",
        blockHash: "0xBLOCKHASH2",
        transactionIndex: "1",
        from: "0xSENDER",
        to: "0xTESTADDRESS",
        value: "3000000",
        gas: "21000",
        gasPrice: "5000000000",
        isError: "0",
        txreceipt_status: "1",
        input: "0xDATA",
        contractAddress: AURORA_USDT_CONTRACT,
        tokenName: "Tether USD",
        tokenSymbol: "USDT",
        tokenDecimal: "6",
      },
      {
        // This one should be filtered out (wrong token)
        blockNumber: "1234569",
        timeStamp: "1620100002",
        hash: "0xTEST3",
        from: "0xSENDER",
        to: "0xTESTADDRESS",
        value: "5000000000000000000",
        contractAddress: "0xDIFFERENTCONTRACT",
        tokenSymbol: "ETH",
        tokenDecimal: "18",
      },
      {
        // This one should be filtered out (wrong recipient)
        blockNumber: "1234570",
        timeStamp: "1620100003",
        hash: "0xTEST4",
        from: "0xTESTADDRESS",
        to: "0xOTHERADDRESS",
        value: "2000000",
        contractAddress: AURORA_USDT_CONTRACT,
        tokenSymbol: "USDT",
        tokenDecimal: "6",
      },
    ];
    //on the first call to fetch, return this response.
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        status: "1",
        message: "OK",
        result: mockTransactions,
      }),
    } as Response)

    const result = await getFundingWalletTxs("0xTESTADDRESS")

    expect(fetch).toHaveBeenCalledTimes(1)

    expect(result.length).toBe(2)

    expect(result[0]).toEqual(
      expect.objectContaining({
        hash: "0xTEST1",
        value: 1, // 1000000 / 10^6
        txAmount: Math.ceil(1 / TX_COST_USDT),
      }),
    )

    expect(result[1]).toEqual(
      expect.objectContaining({
        hash: "0xTEST2",
        value: 3,
        txAmount: Math.ceil(3 / TX_COST_USDT),
      }),
    )
  })

  it("handles API errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"))

    const consoleSpy = jest.spyOn(console, "error").mockImplementation()

    const result = await getFundingWalletTxs("0xTESTADDRESS")

    expect(consoleSpy).toHaveBeenCalled()

    expect(result).toEqual([])

    consoleSpy.mockRestore()
  })
})
