import httpStatus from "http-status"
import { ApiScope, ApiUser } from "@/types/types"
import { isAdminUser } from "@/utils/admin"

export type AbortOptions = {
  type?: string
  detail?: string
}

export class AbortError extends Error {
  statusCode: number

  detail?: string

  type?: string

  isAbortError: boolean

  constructor(statusCode: number, message: string, options?: AbortOptions) {
    super(message)
    this.statusCode = statusCode
    this.type = options?.type
    this.detail = options?.detail

    this.isAbortError = true
  }
}

export const isAbortError = (error: unknown): error is AbortError =>
  typeof error === "object" && !!error && "isAbortError" in error

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

  if (isAdminUser(user)) {
    return
  }

  if (
    !!scopes?.length &&
    !scopes.every((scope) => user?.scopes.includes(scope)) &&
    !user?.scopes.includes("admin")
  ) {
    abort(403)
  }

  if (teamKey && !user.teams.includes(teamKey)) {
    abort(403)
  }
}
