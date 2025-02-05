import { assignSiloToTeam } from "@/actions/silos/assign-silo-to-team"

import {
  createInsertOrUpdate,
  createSelect,
  mockSupabaseClient,
} from "../../../test-utils/mock-supabase-client"
import { createMockSilo } from "../../../test-utils/factories/silo-factory"

const teamId = 95

describe("assignSiloToTeam", () => {
  beforeEach(() => {
    mockSupabaseClient.from("silos").select.mockImplementationOnce(() =>
      createSelect([
        createMockSilo({
          id: 1,
          base_token_name: "Ethereum",
          base_token_symbol: "ETH",
        }),
      ]),
    )

    mockSupabaseClient
      .from("teams")
      .select.mockImplementationOnce(() => createSelect([{ id: teamId }]))
  })

  it("returns assigned silo with correct known base token", async () => {
    mockSupabaseClient.from("silos").update.mockImplementationOnce(() =>
      createInsertOrUpdate(
        createMockSilo({
          id: 1,
          base_token_name: "Aurora",
          base_token_symbol: "AURORA",
        }),
      ),
    )

    const result = await assignSiloToTeam(teamId, { symbol: "AURORA" })

    expect(mockSupabaseClient.from("silos").update).toHaveBeenCalledWith({
      base_token_name: "Aurora",
      base_token_symbol: "AURORA",
    })

    expect(result).toEqual(
      expect.objectContaining({
        base_token_symbol: "AURORA",
        base_token_name: "Aurora",
      }),
    )
  })

  it("throws an error if base token data was not updated", async () => {
    mockSupabaseClient
      .from("silos")
      .update.mockImplementationOnce(() => createInsertOrUpdate(null))

    await expect(
      assignSiloToTeam(teamId, { symbol: "AURORA" }),
    ).rejects.toThrow("Base token data failed to update for a silo")
  })
})

describe("assignSiloToTeam with no silos", () => {
  it("throws an error if no available silo found", async () => {
    mockSupabaseClient
      .from("silos")
      .select.mockImplementationOnce(() => createSelect(null))

    await expect(
      assignSiloToTeam(teamId, { symbol: "AURORA" }),
    ).rejects.toThrow("Unassigned silo not found")
  })
})
