import { TableName } from "@/types/types"
import { mockUser } from "./mock-user"

export const createSelect = <T>(data?: T) => ({
  eq: jest.fn().mockReturnThis(),
  in: jest.fn().mockReturnThis(),
  is: jest.fn().mockReturnThis(),
  not: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  gte: jest.fn().mockReturnThis(),
  lte: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  or: jest.fn().mockReturnThis(),
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
  not: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  gte: jest.fn().mockReturnThis(),
  lte: jest.fn().mockReturnThis(),
})

export const createInsertOrUpdate = <T>(data?: T) => ({
  ...getBaseQueryFunctions(),
  select: jest.fn(() => createSelect(data)),
})

export const createDelete = <T>(data?: T) => ({
  ...getBaseQueryFunctions(),
  select: jest.fn(() => createSelect(data)),
})

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
  api_keys: createTableClient(),
  silos: createTableClient(),
  users: createTableClient(),
  users_teams: createTableClient(),
  oracles: createTableClient(),
  widgets: createTableClient(),
  onboarding_form: createTableClient(),
  blockscout_databases: createTableClient(),
  orders: createTableClient(),
  limits: createTableClient(),
  rules: createTableClient(),
  rule_users: createTableClient(),
  rule_user_deal_data: createTableClient(),
  rule_users_userlists: createTableClient(),
  userlists: createTableClient(),
  rules_userlists: createTableClient(),
  replenishments: createTableClient(),
  silos_teams: createTableClient(),
  datadog_web3_monitors: createTableClient(),
  silo_config_transactions: createTableClient(),
  silo_whitelist_addresses: createTableClient(),
  silo_relayers: createTableClient(),
  silo_bridged_tokens: createTableClient(),
  bridged_tokens: createTableClient(),
  bridged_token_requests: createTableClient(),
  deal_changes: createTableClient(),
  changes: createTableClient(),
  integration_requests: createTableClient(),
}

export const mockSupabaseClient = {
  from: jest.fn((key: TableName) => tables[key]),
  auth: {
    getUser: jest.fn(() => ({
      data: { user: mockUser },
    })),
    getSession: jest.fn(() => ({
      data: {
        session: {
          user: mockUser,
        },
      },
    })),
  },
}
