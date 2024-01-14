"use client"

import qs from "qs"
import cleanDeep from "clean-deep"

class RequestError extends Error {
  statusCode: number
  responseBody?: string
  _is_request_error: boolean

  constructor(message: string, statusCode: number, responseBody?: string) {
    super(message)
    this.statusCode = statusCode
    this.responseBody = responseBody
    this._is_request_error = true
  }
}

export const isRequestError = (error: unknown): error is RequestError =>
  typeof error === "object" && !!error && "_is_request_error" in error

export const request = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit & {
    query?: Record<string, unknown>
  },
) => {
  const cleanQuery = cleanDeep(init?.query ?? {})
  const url = !!Object.keys(cleanQuery).length
    ? `${input}?${qs.stringify(cleanQuery)}`
    : input

  const res = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-type": "application/json",
    },
  })

  if (!res.ok) {
    const { message } = await res.json().catch(() => undefined)

    throw new RequestError(
      `Failed to fetch ${input}: ${res.statusText}`,
      res.status,
      message,
    )
  }

  return res.json() as T
}
