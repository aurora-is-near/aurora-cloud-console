import { getSiloWhitelist } from "@/actions/silo-whitelist/get-silo-whitelist"
import { createMockSilo } from "../../../test-utils/factories/silo-factory"
import {
  createSelect,
  mockSupabaseClient,
} from "../../../test-utils/mock-supabase-client"

const mockSilo = createMockSilo({ id: 1, base_token_symbol: "AURORA" })

const whitelistTxsMock = {
  id: 1,
  address: "0x",
  is_applied: true,
  list: "MAKE_TRANSACTION",
  silo_id: mockSilo.id,
  add_tx_id: "some-tx-hash",
}

const whitelistContractsMock = {
  id: 1,
  address: "0x",
  is_applied: true,
  list: "DEPLOY_CONTRACT",
  silo_id: mockSilo.id,
  add_tx_id: "some-tx-hash",
}

describe("getSiloAddressesWhitelist", () => {
  it("returns list of addresses that are allowed to make transaction for a silo", async () => {
    mockSupabaseClient
      .from("silo_whitelist_addresses")
      .select.mockImplementation(() => createSelect([whitelistTxsMock]))

    const result = await getSiloWhitelist(mockSilo.id, "MAKE_TRANSACTION")

    expect(
      mockSupabaseClient.from("silo_whitelist_addresses").select,
    ).toHaveBeenCalledTimes(1)

    expect(result[0]).toEqual(expect.objectContaining(whitelistTxsMock))
    expect(result[0]).not.toEqual(
      expect.objectContaining(whitelistContractsMock),
    )
  })

  it("returns list of addresses that are allowed to deploy contracts for a silo", async () => {
    mockSupabaseClient
      .from("silo_whitelist_addresses")
      .select.mockImplementation(() => createSelect([whitelistContractsMock]))

    const result = await getSiloWhitelist(mockSilo.id, "DEPLOY_CONTRACT")

    expect(
      mockSupabaseClient.from("silo_whitelist_addresses").select,
    ).toHaveBeenCalledTimes(1)

    expect(result[0]).toEqual(expect.objectContaining(whitelistContractsMock))
    expect(result[0]).not.toEqual(expect.objectContaining(whitelistTxsMock))
  })
})
