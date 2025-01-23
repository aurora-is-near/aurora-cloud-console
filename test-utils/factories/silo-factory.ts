import { Silo } from "@/types/types"

export const createMockSilo = (data?: Partial<Silo>): Silo => ({
  id: 1,
  name: "Test Silo",
  created_at: "2021-01-01T00:00:00Z",
  updated_at: "2021-01-01T00:00:00Z",
  base_token_name: "Test Token",
  base_token_symbol: "TEST",
  chain_id: "1313161555",
  engine_account: "testnet.aurora-silo-dev.near",
  explorer_url: "https://explorer.testnet.aurora.dev",
  blockscout_database_id: 1,
  genesis: "1695870567776",
  rpc_url: "testnet.aurora.dev",
  engine_version: "2.0.22",
  network: "public",
  grafana_network_key: "testnet",
  gas_collection_address: null,
  gas_price: null,
  favicon: "",
  network_logo: "",
  network_logo_dark: "",
  type: "evm",
  replenish_amount: 0,
  replenish_threshold: 0,
  team_id: 1,
  ...data,
})

export const createMockSilos = (count: number, data?: Partial<Silo>): Silo[] =>
  Array.from({ length: count }, (_, index) =>
    createMockSilo({
      id: index + 1,
      name: `Test Silo ${index + 1}`,
      ...data,
    }),
  )
