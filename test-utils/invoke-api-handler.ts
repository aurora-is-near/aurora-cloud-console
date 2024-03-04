import { NextRequest } from "next/server"
import { mockTeam } from "./mock-team"
import { ApiRequestContext, ApiRequestHandler } from "@/types/api"
import { ApiUser, Team } from "@/types/types"
import { mockUser } from "./mock-user"

type CreateMockApiContextOptions<TRequestBody> = {
  params?: Record<string, string>
  body?: TRequestBody
  user?: ApiUser
  team?: Team
}

const createMockApiContext = <TRequestBody>({
  params = {},
  body = {} as TRequestBody,
  user = mockUser,
  team = mockTeam,
}: CreateMockApiContextOptions<TRequestBody> = {}): ApiRequestContext<TRequestBody> => ({
  params,
  body,
  user,
  team,
})

export const invokeApiHandler = async <TResponseBody, TRequestBody>(
  method: string,
  path: string,
  handler: ApiRequestHandler<TResponseBody, TRequestBody>,
  ctxOptions?: CreateMockApiContextOptions<TRequestBody>,
) => {
  const req = new NextRequest(new URL(path, "http://test.com"))
  const ctx = createMockApiContext(ctxOptions)
  const resultBody = await handler(req, ctx)

  return {
    req: {
      method,
      path,
    },
    status: resultBody ? 200 : 204,
    body: resultBody,
  }
}
