import httpStatus from "http-status"

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
  const errorMessage = String(message ?? httpStatus[statusCode])
  const error = new AbortError(statusCode, errorMessage, abortOptions)

  throw error
}
