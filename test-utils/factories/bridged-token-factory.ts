import { BridgedToken } from "@/types/types"

export const createMockBridgedToken = (
  data?: Partial<BridgedToken>,
): BridgedToken => ({
  id: 1,
  name: "Test Token",
  symbol: "TEST",
  decimals: 18,
  created_at: "2021-01-01T00:00:00Z",
  aurora_address: "0x",
  ethereum_address: "0x",
  near_address: "test",
  icon_url: "http://example.com/path/to/icon.png",
  ...data,
})

export const createMockBridgedTokens = (
  count: number,
  data?: Partial<BridgedToken>,
): BridgedToken[] =>
  Array.from({ length: count }, (_, index) =>
    createMockBridgedToken({
      id: index + 1,
      name: `Test Token ${index + 1}`,
      ...data,
    }),
  )
