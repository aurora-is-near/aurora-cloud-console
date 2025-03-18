import { SiloBridgedTokenRequest } from "@/types/types"

export const createMockSiloBridgedTokenRequest = (
  data?: Partial<SiloBridgedTokenRequest>,
): SiloBridgedTokenRequest => ({
  address: "0x123",
  created_at: "2021-10-01T00:00:00Z",
  id: 1,
  resolved_at: null,
  silo_id: 1,
  symbol: "TEST",
  ...data,
})

export const createMockSiloBridgedTokenRequests = (
  count: number,
  data?: Partial<SiloBridgedTokenRequest>,
): SiloBridgedTokenRequest[] =>
  Array.from({ length: count }, (_, index) =>
    createMockSiloBridgedTokenRequest({
      id: index + 1,
      ...data,
    }),
  )
