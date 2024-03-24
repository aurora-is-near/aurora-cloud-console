import { Oracle } from "@/types/types"

export const createMockOracle = (data?: Partial<Oracle>): Oracle => ({
  id: 1,
  silo_id: 1,
  created_at: "2021-01-01T00:00:00Z",
  updated_at: "2021-01-01T00:00:00Z",
  deployed_at: null,
  ...data,
})

export const createMockOracles = (
  count: number,
  data?: Partial<Oracle>,
): Oracle[] =>
  Array.from({ length: count }, (_, index) =>
    createMockOracle({
      id: index + 1,
      ...data,
    }),
  )
