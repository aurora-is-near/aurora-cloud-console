import { ApiRequestContext } from "@/types/api"
import { mockTeam } from "./mock-team"
import { Team } from "@/types/types"

export const createMockApiContext = <TRequestBody = unknown>({
  params = {},
  body = {} as TRequestBody,
  team = mockTeam,
}: {
  params?: Record<string, string>
  body?: TRequestBody
  team?: Team
} = {}): ApiRequestContext<TRequestBody> => {
  return {
    params,
    body,
    team,
  }
}
