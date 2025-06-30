import { ReactNode } from "react"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const authUser = await getAuthUser()

  return (
    <MainDashboardLayout teamKey={teamKey} authUser={authUser}>
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
