"use client"

export const request = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
) => {
  const res = await fetch(input, {
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
