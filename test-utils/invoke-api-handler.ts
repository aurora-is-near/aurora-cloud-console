import { NextRequest } from "next/server"
import { ApiRequestContext, ApiRequestHandler } from "@/types/api"
import { Team } from "@/types/types"
import { isAbortError } from "@/utils/abort"
import { mockTeam } from "./mock-team"

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
  let resultBody

  try {
    resultBody = await handler(req, ctx)
  } catch (error) {
    if (isAbortError(error)) {
      return {
        req: {
          method,
          path,
        },
        status: error.statusCode,
        body: {
          message: error.message,
        },
      }
    }

    throw error
  }

  return {
    req: {
      method,
      path,
    },
    status: resultBody ? 200 : 204,
    body: resultBody,
  }
}
