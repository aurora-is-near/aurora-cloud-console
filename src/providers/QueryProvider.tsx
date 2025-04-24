"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { isRequestError } from "@/utils/api/request"

const MAX_RETRIES = 2
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404]

type QueryProviderProps = {
  children: ReactNode
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount >= MAX_RETRIES) {
          return false
        }

        if (
          isRequestError(error) &&
          HTTP_STATUS_TO_NOT_RETRY.includes(error.statusCode ?? 0)
        ) {
          return false
        }

        return true
      },
    },
  },
})

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
