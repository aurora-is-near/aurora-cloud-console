import { ReactNode } from "react"
import { QueryProvider } from "@/providers/QueryProvider"
import { ModalsProvider } from "@/providers/ModalsProvider"
import { MenuProvider } from "@/providers/MenuProvider"

export const Providers = async ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <MenuProvider>
        <ModalsProvider>{children}</ModalsProvider>
      </MenuProvider>
    </QueryProvider>
  )
}
