import { Order } from "@/types/types"

export const createMockOrder = (data?: Partial<Order>): Order => ({
  id: 1,
  created_at: "2021-01-01T00:00:00Z",
  payment_status: "paid",
  session_id: "mock-session-id",
  team_id: 1,
  type: "initial_setup",
  ...data,
})
