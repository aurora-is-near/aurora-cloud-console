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

export const createInsertOrUpdate = <T>(data?: T) => ({
  eq: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
  is: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  gte: jest.fn().mockReturnThis(),
  lte: jest.fn().mockReturnThis(),
  select: jest.fn(() => createSelect(data)),
})

const createTableClient = jest.fn(() => ({
  select: jest.fn(() => createSelect()),
  update: jest.fn(() => createInsertOrUpdate()),
  insert: jest.fn(() => createInsertOrUpdate()),
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
}

export const mockSupabaseClient = {
  from: jest.fn((key: TableName) => tables[key]),
  auth: {
    getUser: jest.fn(() => ({
      data: { user: mockUser },
    })),
  },
}
