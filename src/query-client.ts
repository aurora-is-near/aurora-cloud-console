import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from "@tanstack/react-query"
import { isRequestError } from "@/utils/api/request"

const MAX_RETRIES = 2
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404]

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5,
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
      dehydrate: {
        // Include pending queries in dehydration.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        shouldRedactErrors: () => {
          // We should not catch Next.js server errors as that's how Next.js
          // detects dynamic pages. Next.js also automatically redacts errors
          // for us with better digests.
          return false
        },
      },
    },
  })

let browserQueryClient: QueryClient | undefined

export const getQueryClient = () => {
  if (isServer) {
    // Server: always make a new query client
    return createQueryClient()
  }

  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client.
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient()
  }

  return browserQueryClient
}
