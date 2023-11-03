"use client"

import qs from "qs"
import cleanDeep from "clean-deep"

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
    throw new Error(`Failed to fetch ${input}: ${res.statusText}`)
  }

  return res.json() as T
}
