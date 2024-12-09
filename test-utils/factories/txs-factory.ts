import type { Transaction, Block } from "@/types/blockscout"

function generateTimestamps(startDate: string, numberOfDays: number) {
  const start = new Date(startDate)
  start.setDate(1)
  const timestamps: Array<{ timestamp: number }> = []
  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)
    timestamps.push({ timestamp: Math.floor(currentDate.getTime() / 1000) })
  }

  return timestamps
}

export const createMockBlockscoutTx = (
  data?: Partial<Transaction>,
): Transaction => ({
  gas: 6721975,
  gas_price: 70000000,
  gas_used: 99285,
  status: 1,
  block_number: 1,
  ...data,
})

export const createMockBlockscoutBlock = (data?: Partial<Block>): Block => ({
  number: 1,
  timestamp: 1730419200,
  ...data,
})

export const createMockBlockscoutTxs = (days: number): Transaction[] => {
  return Array.from({ length: days }, (_, index) =>
    createMockBlockscoutTx({ block_number: index + 1 }),
  )
}

export const createMockBlockscoutBlocks = (
  days: number,
  startDate: string,
): Block[] => {
  const timestamps = generateTimestamps(startDate, days)
  return Array.from({ length: days }, (_, index) =>
    createMockBlockscoutBlock({
      number: index + 1,
      timestamp: timestamps[index].timestamp,
    }),
  )
}
