import { ReactNode } from "react"

import { isAdmin } from "@/actions/is-admin"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const isAdminUser = await isAdmin()

  return (
    <MainDashboardLayout teamKey={teamKey} showAdminMenu={isAdminUser}>
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
