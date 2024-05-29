import { Bridge } from "@/types/types"

export const createMockBridge = (data?: Partial<Bridge>): Bridge => ({
  id: 1,
  silo_id: 1,
  created_at: "2021-01-01T00:00:00Z",
  updated_at: "2021-01-01T00:00:00Z",
  from_networks: [],
  to_networks: [],
  ...data,
})

export const createMockBridges = (
  count: number,
  data?: Partial<Bridge>,
): Bridge[] =>
  Array.from({ length: count }, (_, index) =>
    createMockBridge({
      id: index + 1,
      ...data,
    }),
  )
