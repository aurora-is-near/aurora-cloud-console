type TableName = "transactions" | "blocks"

export const createSelect = <T>(data?: T) => ({
  eq: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
  is: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  gte: jest.fn().mockReturnThis(),
  lte: jest.fn().mockReturnThis(),
  single: jest.fn(() => ({
    data,
    error: null,
  })),
  maybeSingle: jest.fn(() => ({
    data,
    error: null,
  })),
  data,
  error: null,
})

const createTableClient = jest.fn(() => ({
  select: jest.fn(() => createSelect()),
}))

const tables: Record<TableName, ReturnType<typeof createTableClient>> = {
  blocks: createTableClient(),
  transactions: createTableClient(),
}

export const mockBlockscoutClient = {
  from: jest.fn((key: TableName) => tables[key]),
}
