import { mockUser } from "./mock-user"
import { TableName } from "@/types/types"

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

const getBaseQueryFunctions = () => ({
  eq: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
  is: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  gte: jest.fn().mockReturnThis(),
  lte: jest.fn().mockReturnThis(),
})

export const createInsertOrUpdate = <T>(data?: T) => ({
  ...getBaseQueryFunctions(),
  select: jest.fn(() => createSelect(data)),
})

export const createDelete = () => getBaseQueryFunctions()

const createTableClient = jest.fn(() => ({
  select: jest.fn(() => createSelect()),
  update: jest.fn(() => createInsertOrUpdate()),
  insert: jest.fn(() => createInsertOrUpdate()),
  delete: jest.fn(() => createDelete()),
}))

const tables: Record<TableName, ReturnType<typeof createTableClient>> = {
  teams: createTableClient(),
  deals: createTableClient(),
  lists: createTableClient(),
  api_keys: createTableClient(),
  tokens: createTableClient(),
  silos: createTableClient(),
  silos_tokens: createTableClient(),
  teams_silos: createTableClient(),
  users: createTableClient(),
  users_teams: createTableClient(),
  oracles: createTableClient(),
}

export const mockSupabaseClient = {
  from: jest.fn((key: TableName) => tables[key]),
  auth: {
    getUser: jest.fn(() => ({
      data: { user: mockUser },
    })),
  },
}
