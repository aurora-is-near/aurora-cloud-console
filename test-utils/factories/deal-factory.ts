import { Deal } from "@/types/types"

export const createMockDeal = (data?: Partial<Deal>): Deal => ({
  id: 1,
  name: "Test Deal",
  team_id: 1,
  created_at: "2021-01-01T00:00:00Z",
  updated_at: "2021-01-01T00:00:00Z",
  demo_key: null,
  ...data,
})

export const createMockDeals = (count: number, data?: Partial<Deal>): Deal[] =>
  Array.from({ length: count }, (_, index) =>
    createMockDeal({
      id: index + 1,
      name: `Test Deal ${index + 1}`,
      ...data,
    }),
  )
