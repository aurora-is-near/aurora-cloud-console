import { Team } from "@/types/types"

export const mockTeam: Team = {
  created_at: "2023-01-10T00:00:00.000Z",
  id: 1,
  name: "Mock Team",
  team_key: "mock-team",
  updated_at: "2023-01-10T00:00:00.000Z",
  prepaid_transactions: 1000,
  funding_wallet_address: "0x1234567890abcdef1234567890abcdef12345678",
  funding_wallet_pk: "encrypted-private-key",
}
