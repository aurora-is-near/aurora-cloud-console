import { Deal, Filter } from "@/types/types"

export const createMockFilter = (
  dealId: number,
  data?: Partial<Filter>,
): Filter => ({
  id: 1,
  deal_id: dealId,
  filter_type: "USER",
  blacklist: false,
  created_at: "2021-01-01T00:00:00.000Z",
  updated_at: "2021-01-01T00:00:00.000Z",
  deleted_at: null,
  ...data,
})

export const createMockFilters = (
  dealId: number,
  count: number,
  data?: Partial<Filter>,
): Filter[] =>
  Array.from({ length: count }, (_, index) =>
    createMockFilter(dealId, {
      id: index + 1,
      ...data,
    }),
  )
