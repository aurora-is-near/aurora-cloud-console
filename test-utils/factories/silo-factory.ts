import { Silo } from "@/types/types"

export const createMockSilo = (data?: Partial<Silo>): Silo => ({
  id: 1,
  name: "Test Silo",
  created_at: "2021-01-01T00:00:00Z",
  updated_at: "2021-01-01T00:00:00Z",
  base_token_name: "Test Token",
  base_token_symbol: "ETH",
  base_token_decimals: 18,
  chain_id: 1313161555,
  engine_account: "testnet.aurora-silo-dev.near",
  explorer_url: "https://explorer.testnet.aurora.dev",
  blockscout_database_id: 1,
  genesis: "1695870567776",
  rpc_url: "testnet.aurora.dev",
  engine_version: "2.0.22",
  grafana_network_key: "testnet",
  gas_collection_address: null,
  gas_price: "0",
  network_logo: "https://example.com/network_logo.png",
  network_logo_dark: "https://example.com/network_logo_dark.png",
  favicon: "https://example.com/favicon.png",
  type: "evm",
  replenish_amount: 0,
  replenish_threshold: 0,
  silo_to_silo_bridge_address: null,
  is_active: true,
  applied_deal_ids: [],
  deleted_at: null,
  is_make_txs_public: false,
  is_deploy_contracts_public: false,
  inspected_at: null,
  intents_integration_status: "INITIAL",
  trisolaris_integration_status: "INITIAL",
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
