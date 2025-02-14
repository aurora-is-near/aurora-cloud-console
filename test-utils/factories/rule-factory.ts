import { Rule } from "@/types/types"

export const createMockRule = (data?: Partial<Rule>): Rule => ({
  id: 1,
  deal_id: 1,
  chains: [1],
  contracts: null,
  except_chains: null,
  except_contracts: null,
  ui_enabled: true,
  created_at: "2021-01-01T00:00:00.000Z",
  updated_at: "2021-01-01T00:00:00.000Z",
  deleted_at: null,
  ...data,
})

export const createMockRules = (count: number, data?: Partial<Rule>): Rule[] =>
  Array.from({ length: count }, (_, index) =>
    createMockRule({
      id: index + 1,
      ...data,
    }),
  )
