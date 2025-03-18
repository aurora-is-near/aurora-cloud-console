import { BridgedTokenRequest } from "@/types/types"

export const createMockBridgedTokenRequest = (
  data?: Partial<BridgedTokenRequest>,
): BridgedTokenRequest => ({
  address: "0x123",
  created_at: "2021-10-01T00:00:00Z",
  id: 1,
  resolved_at: null,
  silo_id: 1,
  symbol: "TEST",
  ...data,
})

export const createMockBridgedTokenRequests = (
  count: number,
  data?: Partial<BridgedTokenRequest>,
): BridgedTokenRequest[] =>
  Array.from({ length: count }, (_, index) =>
    createMockBridgedTokenRequest({
      id: index + 1,
      ...data,
    }),
  )
