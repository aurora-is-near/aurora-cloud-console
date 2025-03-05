"use client"

import { useRef } from "react"

type Options = {
  delays: number[]
  maxRetries: number
  onRetriesComplete: () => void
}

const defaultOptions: Options = {
  maxRetries: 5,
  delays: [2000, 3000, 5000, 8000, 10000],
  onRetriesComplete: () => {},
}

export const useProgressiveRetry = (options?: Partial<Options>) => {
  const { maxRetries, delays, onRetriesComplete } = {
    ...defaultOptions,
    ...options,
  }
  const retryCount = useRef(0)
  const delay = delays[retryCount.current] || delays[delays.length - 1]

  const retry = (callback: () => void) => {
    if (retryCount.current < maxRetries) {
      retryCount.current += 1
      setTimeout(() => {
        callback()
        if (retryCount.current === maxRetries) {
          onRetriesComplete()
        }
      }, delay)
    }
  }

  return { retry, retryCount }
}
