/**
 * @jest-environment node
 */
import { NextRequest } from "next/server"
import { processTeamTx } from "@/actions/teams-funding/process-team-tx"
import { getTeams } from "@/actions/teams/get-teams"
import { Team } from "@/types/types"
import { GET } from "./route"
import { logger } from "@/logger"
import { createMockTeams } from "../../../../../test-utils/factories/team-factory"

jest.mock("@/actions/teams/get-teams")
jest.mock("@/actions/teams-funding/process-team-tx")
jest.mock("@/logger")
global.fetch = jest.fn()

describe("Process Crypto Transactions API", () => {
  it("should reject requests without the Vercel cron user-agent", async () => {
    const req = new NextRequest(
      "https://example.com/api/teams/process-crypto-tx",
    )
    await expect(GET(req)).rejects.toThrow("Forbidden")
    expect(getTeams).not.toHaveBeenCalled()
  })

  it("should process all teams when called with correct user-agent", async () => {
    const mockTeams: Team[] = createMockTeams(2)
    const mockGetTeams = getTeams as jest.MockedFunction<typeof getTeams>

    mockGetTeams.mockResolvedValue(mockTeams)

    const mockProcessTeamTx = processTeamTx as jest.MockedFunction<
      typeof processTeamTx
    >

    mockProcessTeamTx.mockResolvedValue(undefined)

    const req = new NextRequest(
      "https://example.com/api/teams/process-crypto-tx",
      {
        headers: {
          "user-agent": "vercel-cron/1.0",
        },
      },
    )

    const response = await GET(req)

    expect(response).toBeInstanceOf(Response)
    expect(await response.text()).toBe("ok")

    expect(getTeams).toHaveBeenCalledTimes(1)
    expect(mockProcessTeamTx).toHaveBeenCalledTimes(mockTeams.length)
    expect(mockProcessTeamTx).toHaveBeenCalledWith(mockTeams[0])
    expect(mockProcessTeamTx).toHaveBeenCalledWith(mockTeams[1])
  })

  it("should handle errors from getTeams", async () => {
    const mockGetTeams = getTeams as jest.MockedFunction<typeof getTeams>

    mockGetTeams.mockRejectedValue(new Error("Database error"))

    const req = new NextRequest(
      "https://example.com/api/teams/process-crypto-tx",
      {
        headers: {
          "user-agent": "vercel-cron/1.0",
        },
      },
    )

    await expect(GET(req)).rejects.toThrow("Database error")
    expect(getTeams).toHaveBeenCalledTimes(1)
    expect(processTeamTx).not.toHaveBeenCalled()
  })

  it("should continue processing other teams if one fails", async () => {
    const mockTeams: Team[] = createMockTeams(2)
    const mockGetTeams = getTeams as jest.MockedFunction<typeof getTeams>

    mockGetTeams.mockResolvedValue(mockTeams)

    const mockProcessTeamTx = processTeamTx as jest.MockedFunction<
      typeof processTeamTx
    >

    mockProcessTeamTx.mockImplementation((team) => {
      if (team.id === 1) {
        return Promise.reject(new Error("Processing failed for team 1"))
      }

      return Promise.resolve(undefined)
    })

    const req = new NextRequest(
      "https://example.com/api/teams/process-crypto-tx",
      {
        headers: {
          "user-agent": "vercel-cron/1.0",
        },
      },
    )

    // This should still complete successfully because the Promise.all wraps
    // each individual team's processing in a separate Promise
    const response = await GET(req)

    expect(response).toBeInstanceOf(Response)
    expect(await response.text()).toBe("ok")

    expect(getTeams).toHaveBeenCalledTimes(1)
    expect(mockProcessTeamTx).toHaveBeenCalledTimes(mockTeams.length)
    expect(mockProcessTeamTx).toHaveBeenCalledWith(mockTeams[0])
    expect(mockProcessTeamTx).toHaveBeenCalledWith(mockTeams[1])
    expect(logger.error).toHaveBeenCalled()
  })
})
