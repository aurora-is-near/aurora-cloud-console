import { getUser } from "./auth"
import { NextRequest, NextResponse } from "next/server"
import { ApiScope, ApiUser } from "@/types/types"
import httpStatus from "http-status"
import { toError } from "./errors"
import { abortIfUnauthorised, isAbortError } from "./abort"
import { kebabCase } from "change-case"
import { getTeamKey } from "@/utils/team-key"

type BaseApiRequestContext = {
  params: {
    [key: string]: string
  }
}

export type ApiRequestContext = BaseApiRequestContext & {
  user: ApiUser
  teamKey: string | null
}

export type AuthorisedApiRequestContext = Omit<ApiRequestContext, "user"> & {
  user: ApiUser
}

type ApiRequestHandler<Body = unknown> = (
  req: NextRequest,
  context: ApiRequestContext,
) => Promise<Body>

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
const getErrorResponse = (error: unknown) => {
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

/**
 * Confirm that the user is logged in based on a session cookie or API key.
 */
export const apiRequestHandler =
  <Body = unknown>(scopes: ApiScope[], handler: ApiRequestHandler<Body>) =>
  async (req: NextRequest, ctx: BaseApiRequestContext) => {
    const [user, teamKey] = await Promise.all([getUser(), getTeamKey(req)])
    let data: Body

    try {
      abortIfUnauthorised(user, scopes, teamKey)
      data = await handler(req, { ...ctx, user, teamKey })
    } catch (error: unknown) {
      return getErrorResponse(error)
    }

    return data
  }
