import { TableName } from "@/types/types"
import { mockUser } from "./mock-user"

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
  upsert: jest.fn(() => createInsertOrUpdate()),
}))

const tables: Record<TableName, ReturnType<typeof createTableClient>> = {
  teams: createTableClient(),
  deals: createTableClient(),
  lists: createTableClient(),
  api_keys: createTableClient(),
  tokens: createTableClient(),
  silos: createTableClient(),
  users: createTableClient(),
  users_teams: createTableClient(),
  oracles: createTableClient(),
  widgets: createTableClient(),
  onboarding_form: createTableClient(),
  filters: createTableClient(),
  filter_entries: createTableClient(),
  limits: createTableClient(),
  rules: createTableClient(),
  rule_users: createTableClient(),
  rule_user_deal_data: createTableClient(),
  rule_users_userlists: createTableClient(),
  userlists: createTableClient(),
  rules_userlists: createTableClient(),
  blockscout_databases: createTableClient(),
}

export const mockSupabaseClient = {
  from: jest.fn((key: TableName) => tables[key]),
  auth: {
    getUser: jest.fn(() => ({
      data: { user: mockUser },
    })),
  },
}
