import { ReactNode } from "react"
import { QueryProvider } from "@/providers/QueryProvider"
import { isAdmin } from "@/actions/admin/is-admin"
import { AdminProvider } from "@/providers/AdminProvider"
import { ModalsProvider } from "@/providers/ModalsProvider"

export default async function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AdminProvider isAdmin={await isAdmin()}>
        <ModalsProvider>{children}</ModalsProvider>
      </AdminProvider>
    </QueryProvider>
  )
}
