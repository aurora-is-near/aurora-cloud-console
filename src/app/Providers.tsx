import { ReactNode } from "react"
import { QueryProvider } from "@/providers/QueryProvider"
import { ModalsProvider } from "@/providers/ModalsProvider"
import { MenuProvider } from "@/providers/MenuProvider"
import { AnalyticsProvider } from "@/providers/AnalyticsProvider"
import { PreviousRouteProvider } from "@/providers/PreviousRouteProvider"

export const Providers = async ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <AnalyticsProvider>
        <PreviousRouteProvider>
          <MenuProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </MenuProvider>
        </PreviousRouteProvider>
      </AnalyticsProvider>
    </QueryProvider>
  )
}
