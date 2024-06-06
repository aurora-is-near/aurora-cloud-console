import { Token } from "@/types/types"

export const createMockToken = (data?: Partial<Token>): Token => ({
  id: 1,
  silo_id: 1,
  name: "Test Token",
  symbol: "TEST",
  decimals: 18,
  created_at: "2021-01-01T00:00:00Z",
  address: "0x",
  bridge_addresses: [],
  deployment_status: "NOT_DEPLOYED",
  bridge_deployment_status: "NOT_DEPLOYED",
  bridge_origin: "ethereum",
  fast_bridge: false,
  type: "ERC20",
  icon_url: "http://example.com/path/to/icon.png",
  ...data,
})

export const createMockTokens = (
  count: number,
  data?: Partial<Token>,
): Token[] =>
  Array.from({ length: count }, (_, index) =>
    createMockToken({
      id: index + 1,
      name: `Test Silo ${index + 1}`,
      ...data,
    }),
  )
