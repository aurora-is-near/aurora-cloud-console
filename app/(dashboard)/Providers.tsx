"use client"

import { ReactNode, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserProvider } from "@/utils/UserContext"
import { ModalsProvider } from "@/hooks/useModals"

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ModalsProvider>{children}</ModalsProvider>
      </UserProvider>
    </QueryClientProvider>
  )
}
