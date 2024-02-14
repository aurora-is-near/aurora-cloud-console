import httpStatus from "http-status"
import { ApiScope, ApiUser } from "@/types/types"
import { isAdminUser } from "@/utils/admin"

type AbortOptions = {
  type?: string
  detail?: string
}

class AbortError extends Error {
  statusCode: number

  detail?: string

  type?: string

  _is_abort_error: boolean

  constructor(statusCode: number, message: string, options?: AbortOptions) {
    super(message)
    this.statusCode = statusCode
    this.type = options?.type
    this.detail = options?.detail

    this._is_abort_error = true
  }
}

export const isAbortError = (error: unknown): error is AbortError =>
  typeof error === "object" && !!error && "_is_abort_error" in error

/**
 * Throw an error with the given status code.
 *
 * The error is intended to be picked up by the error handling middleware.
 */
export function abort(
  statusCode: number,
  message?: string,
  abortOptions?: AbortOptions,
): never {
  const errorMessage = String(message || httpStatus[statusCode])
  const error = new AbortError(statusCode, errorMessage, abortOptions)

  throw error
}

export function abortIfUnauthorised(
  user: ApiUser | null,
  scopes: ApiScope[],
  teamKey: string | null,
): asserts user is ApiUser {
  if (!user) {
    abort(401)
  }

  if (
    !!scopes?.length &&
    !scopes.every((scope) => user?.scopes.includes(scope)) &&
    !user?.scopes.includes("admin")
  ) {
    abort(403)
  }

  // Check if the authorised user is a member of the team, or an admin user
  // (admin users have access to all teams).
  if (teamKey && !user.teams.includes(teamKey) && !isAdminUser(user)) {
    abort(403)
  }
}
