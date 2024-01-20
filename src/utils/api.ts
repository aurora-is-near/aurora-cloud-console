import { getUser } from "./auth"
import { NextRequest, NextResponse } from "next/server"
import { ApiScope, ApiUser, Team } from "@/types/types"
import httpStatus from "http-status"
import { toError } from "./errors"
import { abortIfUnauthorised, isAbortError } from "./abort"
import { kebabCase } from "change-case"
import { getCurrentTeam } from "@/utils/current-team"
import { ApiOperation, ApiResponseBody } from "@/types/api-contract"
import { contract } from "@/api-contract"

type BaseApiRequestContext = {
  params: {
    [key: string]: string
  }
}

export type ApiRequestContext = BaseApiRequestContext & {
  user: ApiUser
  team: Team
}

export type AuthorisedApiRequestContext = Omit<ApiRequestContext, "user"> & {
  user: ApiUser
}

type ApiRequestHandler<Body = unknown> = (
  req: NextRequest,
  context: ApiRequestContext,
) => Promise<Body>

type ErrorResponse = {
  type: string
  statusCode: number
  message: string
  details?: string
}

/**
 * Get the specific type of error.
 *
 * If one was provided when aborting further up the chain use that, otherwise
 * fallback to a default based on the status code.
 * @example /probs/token-expired
 * @example /probs/bad-request
 */
const getErrorType = (error: unknown, statusCode: number): string => {
  return isAbortError(error) && error.type
    ? error.type
    : `/probs/${kebabCase(String(httpStatus[statusCode]))}`
}

/**
 * Get an error response in the format of a RFC7807 problem details object.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc7807
 */
const getErrorResponse = (error: unknown): NextResponse<ErrorResponse> => {
  const statusCode = isAbortError(error) ? error.statusCode : 500

  const response = NextResponse.json(
    {
      type: getErrorType(error, statusCode),
      statusCode,
      message: toError(error).message,
      details: isAbortError(error) ? error.detail : undefined,
    },
    { status: statusCode },
  )

  response.headers.set("Content-Type", "application/problem+json")

  return response
}

const handleRequest = async <Body = unknown>(
  req: NextRequest,
  ctx: BaseApiRequestContext,
  scopes: ApiScope[],
  handler: ApiRequestHandler<Body>,
): Promise<NextResponse<Body | ErrorResponse>> => {
  const [user, team] = await Promise.all([getUser(), getCurrentTeam(req)])
  let data: Body

  try {
    abortIfUnauthorised(user, scopes, team.team_key)
    data = await handler(req, { ...ctx, user, team })
  } catch (error: unknown) {
    console.error(error)

    return getErrorResponse(error)
  }

  return NextResponse.json(data)
}

export const apiRequestHandler =
  <Body = unknown>(scopes: ApiScope[], handler: ApiRequestHandler<Body>) =>
  async (req: NextRequest, ctx: BaseApiRequestContext) =>
    handleRequest(req, ctx, scopes, handler)

/**
 * Create an authenticated API endpoint based on an operation from the contract.
 */
export const createApiEndpoint =
  <T extends ApiOperation>(
    operationId: T,
    handler: ApiRequestHandler<ApiResponseBody<T>>,
  ) =>
  async (
    req: NextRequest,
    ctx: BaseApiRequestContext,
  ): Promise<NextResponse<ApiResponseBody<T> | ErrorResponse>> => {
    const { metadata } =
      Object.entries(contract).find(([key]) => key === operationId)?.[1] ?? {}

    const scopes = (metadata?.scopes ?? []) as ApiScope[]
    const data = await handleRequest<ApiResponseBody<T>>(
      req,
      ctx,
      scopes,
      handler,
    )

    return data
  }
