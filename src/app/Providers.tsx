import { ReactNode } from "react"
import { QueryProvider } from "@/providers/QueryProvider"
import { ModalsProvider } from "@/providers/ModalsProvider"
import { MenuProvider } from "@/providers/MenuProvider"
import { AnalyticsProvider } from "@/providers/AnalyticsProvider"

export const Providers = async ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <AnalyticsProvider>
        <MenuProvider>
          <ModalsProvider>{children}</ModalsProvider>
        </MenuProvider>
      </AnalyticsProvider>
    </QueryProvider>
  )
}
