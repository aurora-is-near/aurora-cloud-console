import { addHours } from "date-fns"

export const GAS_SWAP_TRANSACTION_TIME_BOUNDARY = new Date(
  addHours(new Date(), 1),
).toISOString()
