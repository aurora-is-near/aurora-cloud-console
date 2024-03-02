import { ApiRequestContext } from "@/types/api"
import { mockUser } from "./mock-user"
import { mockTeam } from "./mock-team"
import { ApiUser, Team } from "@/types/types"

export const createMockApiContext = <TRequestBody = unknown>({
  params = {},
  body = {} as TRequestBody,
  user = mockUser,
  team = mockTeam,
}: {
  params?: Record<string, string>
  body?: TRequestBody
  user?: ApiUser
  team?: Team
} = {}): ApiRequestContext<TRequestBody> => {
  return {
    params,
    body,
    user,
    team,
  }
}
