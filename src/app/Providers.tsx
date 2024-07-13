import { ReactNode } from "react"
import { QueryProvider } from "@/providers/QueryProvider"
import { ModalsProvider } from "@/providers/ModalsProvider"

export const Providers = async ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <ModalsProvider>{children}</ModalsProvider>
    </QueryProvider>
  )
}
