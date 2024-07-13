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

const getBaseUrl = (input: RequestInfo | URL): string => {
  if (typeof input === "string") {
    return input
  }

  if (input instanceof URL) {
    return input.href
  }

  return input.url
}

export const isRequestError = (error: unknown): error is RequestError =>
  typeof error === "object" && !!error && "_is_request_error" in error

export const request = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit & {
    query?: unknown
  },
) => {
  const cleanQuery = cleanDeep(init?.query ?? {})
  const baseUrl = getBaseUrl(input)
  const url = Object.keys(cleanQuery).length
    ? `${baseUrl}?${qs.stringify(cleanQuery)}`
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
      `Failed to fetch ${baseUrl}: ${res.statusText}`,
      res.status,
      message,
    )
  }

  return res.json() as T
}
