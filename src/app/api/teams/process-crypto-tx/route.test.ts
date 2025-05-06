/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { GET } from "./route"
import { processTeamTx } from "@/actions/teams-funding/process-team-tx"
import { getTeams } from "@/actions/teams/get-teams"
import { abort } from "@/utils/abort"
import { Team } from "@/types/types"
// Mock dependencies
jest.mock("@/actions/teams/get-teams")
jest.mock("@/actions/teams-funding/process-team-tx")
jest.mock("@/utils/abort")

describe("Process Crypto Transactions API", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should reject requests without the Vercel cron user-agent", async () => {
    // Mock abort to capture the call
    const mockAbort = abort as jest.MockedFunction<typeof abort>
    mockAbort.mockImplementation((statusCode, message) => {
      throw new Error(`Abort: ${statusCode} - ${message}`)
    })

    // Create a request without the correct user-agent
    const req = new NextRequest("https://example.com/api/teams/process-crypto-tx")

    // Test that the function aborts
    await expect(GET(req)).rejects.toThrow("Abort: 403 - Forbidden")
    expect(mockAbort).toHaveBeenCalledWith(403, "Forbidden")
    expect(getTeams).not.toHaveBeenCalled()
  })

  it("should process all teams when called with correct user-agent", async () => {
    // Mock getTeams to return mock data
           const mockTeams: Team[] = [
             {
               created_at: "2023-01-01",
               id: 1,
               name: "Team One",
               prepaid_transactions: 0,
               funding_wallet_pk: "pk_123",
               team_key: "Team One",
               updated_at: "2023-01-01",
               funding_wallet_address: "0x123",
             },
             {
               created_at: "2023-01-01",
               id: 2,
               name: "Team Two",
               prepaid_transactions: 0,
               funding_wallet_pk: "pk_456",
               team_key: "Team Two",
               updated_at: "2023-01-01",
               funding_wallet_address: "0x456",
             },
           ]
    const mockGetTeams = getTeams as jest.MockedFunction<typeof getTeams>
    mockGetTeams.mockResolvedValue(mockTeams)

    // Mock processTeamTx
    const mockProcessTeamTx = processTeamTx as jest.MockedFunction<typeof processTeamTx>
    mockProcessTeamTx.mockResolvedValue(undefined)

    // Create a request with the correct user-agent
    const req = new NextRequest("https://example.com/api/teams/process-crypto-tx", {
      headers: {
        "user-agent": "vercel-cron/1.0"
      }
    })

    // Call the handler
    const response = await GET(req)

    // Verify response
    expect(response).toBeInstanceOf(Response)
    expect(await response.text()).toBe("ok")

    // Verify mocks were called correctly
    expect(getTeams).toHaveBeenCalledTimes(1)
    expect(mockProcessTeamTx).toHaveBeenCalledTimes(mockTeams.length)
    expect(mockProcessTeamTx).toHaveBeenCalledWith(mockTeams[0])
    expect(mockProcessTeamTx).toHaveBeenCalledWith(mockTeams[1])
  })

  it("should handle errors from getTeams", async () => {
    // Mock getTeams to throw an error
    const mockGetTeams = getTeams as jest.MockedFunction<typeof getTeams>
    mockGetTeams.mockRejectedValue(new Error("Database error"))

    // Create a request with the correct user-agent
    const req = new NextRequest("https://example.com/api/teams/process-crypto-tx", {
      headers: {
        "user-agent": "vercel-cron/1.0"
      }
    })

    // Test that the function rejects
    await expect(GET(req)).rejects.toThrow("Database error")
    expect(getTeams).toHaveBeenCalledTimes(1)
    expect(processTeamTx).not.toHaveBeenCalled()
  })

  it("should continue processing other teams if one fails", async () => {
    // Mock getTeams to return mock data
         const mockTeams: Team[] = [
           {
             created_at: "2023-01-01",
             id: 1,
             name: "Team One",
             prepaid_transactions: 0,
             funding_wallet_pk: "pk_123",
             team_key: "Team One",
             updated_at: "2023-01-01",
             funding_wallet_address: "0x123",
           },
           {
             created_at: "2023-01-01",
             id: 2,
             name: "Team Two",
             prepaid_transactions: 0,
             funding_wallet_pk: "pk_456",
             team_key: "Team Two",
             updated_at: "2023-01-01",
             funding_wallet_address: "0x456",
           },
         ]
    const mockGetTeams = getTeams as jest.MockedFunction<typeof getTeams>
    mockGetTeams.mockResolvedValue(mockTeams)

    // Mock processTeamTx to fail for the first team
    const mockProcessTeamTx = processTeamTx as jest.MockedFunction<typeof processTeamTx>
    mockProcessTeamTx.mockImplementation((team) => {
      if (team.id === 1) {
        return Promise.reject(new Error("Processing failed for team 1"))
      }
      return Promise.resolve(undefined)
    })

    // Create a request with the correct user-agent
    const req = new NextRequest("https://example.com/api/teams/process-crypto-tx", {
      headers: {
        "user-agent": "vercel-cron/1.0"
      }
    })

    // This should still complete successfully because the Promise.all wraps
    // each individual team's processing in a separate Promise
    const response = await GET(req)

    // Verify response
    expect(response).toBeInstanceOf(Response)
    expect(await response.text()).toBe("ok")

    // Verify mocks were called correctly
    expect(getTeams).toHaveBeenCalledTimes(1)
    expect(mockProcessTeamTx).toHaveBeenCalledTimes(mockTeams.length)
    expect(mockProcessTeamTx).toHaveBeenCalledWith(mockTeams[0])
    expect(mockProcessTeamTx).toHaveBeenCalledWith(mockTeams[1])
  })
})
