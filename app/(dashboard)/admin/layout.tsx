import { ReactNode } from "react"
import { isAdmin } from "@/actions/admin/is-admin"
import { notFound } from "next/navigation"

const Layout = async ({ children }: { children: ReactNode }) => {
  if (!(await isAdmin())) {
    notFound()
  }

  return <>{children}</>
}

export default Layout
