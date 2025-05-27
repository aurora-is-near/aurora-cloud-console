import timestring from "timestring"

export const GAS_SWAP_TRANSACTION_TIME_BOUNDARY = new Date(
  timestring(1, "hour"),
).toISOString()
