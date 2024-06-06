import { NextRequest } from "next/server"
import { mockTeam } from "./mock-team"
import { ApiRequestContext, ApiRequestHandler } from "@/types/api"
import { Team } from "@/types/types"

type CreateMockApiContextOptions<TRequestBody> = {
  params?: Record<string, string>
  body?: TRequestBody
  team?: Team
}

const createMockApiContext = <TRequestBody>({
  params = {},
  body = {} as TRequestBody,
  team = mockTeam,
}: CreateMockApiContextOptions<TRequestBody> = {}): ApiRequestContext<TRequestBody> => ({
  params,
  body,
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
