import { Widget } from "@/types/types"

export const createMockWidget = (data?: Partial<Widget>): Widget => ({
  id: 1,
  silo_id: 1,
  created_at: "2021-01-01T00:00:00Z",
  updated_at: "2021-01-01T00:00:00Z",
  from_networks: [],
  to_networks: [],
  tokens: [],
  ...data,
})

export const createMockWidgets = (
  count: number,
  data?: Partial<Widget>,
): Widget[] =>
  Array.from({ length: count }, (_, index) =>
    createMockWidget({
      id: index + 1,
      ...data,
    }),
  )
