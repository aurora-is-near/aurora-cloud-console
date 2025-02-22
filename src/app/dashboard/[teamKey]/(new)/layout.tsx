import { ReactNode } from "react"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"

const Layout = ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  return <MainDashboardLayout teamKey={teamKey}>{children}</MainDashboardLayout>
}

export default Layout
