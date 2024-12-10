import { Limit } from "@/types/types"

export const createMockLimit = (overrides: Partial<Limit> = {}): Limit => ({
  id: 1,
  deal_id: 1,
  limit_value: 100,
  limit_type: "CYCLIC",
  limit_scope: "USER",
  duration: "P30D",
  created_at: "2024-01-01T00:00:00.000Z",
  updated_at: "2024-01-01T00:00:00.000Z",
  deleted_at: null,
  ...overrides,
})

export const createMockLimits = (count: number = 3): Limit[] =>
  Array.from({ length: count }, () => createMockLimit())
