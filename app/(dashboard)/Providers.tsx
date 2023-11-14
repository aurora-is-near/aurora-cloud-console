"use client"

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserProvider } from "@/utils/UserContext"
import { ModalsProvider } from "@/hooks/useModals"

const queryClient = new QueryClient()

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ModalsProvider>{children}</ModalsProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}
