"use client"

import { QueryClient } from "@tanstack/react-query"
import { ReactNode } from "react"
import { del, get, set } from "idb-keyval"
import {
  PersistedClient,
  Persister,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client"
import timestring from "timestring"

type QueryProviderProps = {
  children: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: timestring("24h"),
    },
  },
})

const INDEXED_DB_KEY = "acc-queries"

const persister: Persister = {
  persistClient: async (client: PersistedClient) => {
    await set(INDEXED_DB_KEY, client)
  },
  restoreClient: async () => {
    return get<PersistedClient>(INDEXED_DB_KEY)
  },
  removeClient: async () => {
    await del(INDEXED_DB_KEY)
  },
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}
