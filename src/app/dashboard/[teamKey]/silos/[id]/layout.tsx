import { ReactNode } from "react"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { SiloSelect } from "@/components/SiloSelect"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { SiloProvider } from "@/providers/SiloProvider"

const Layout = async ({
  children,
  params: { id, teamKey },
}: {
  children: ReactNode
  params: { id: string; teamKey: string }
}) => {
  const siloId = Number(id)
  const authUser = await getAuthUser()

  return (
    <MainDashboardLayout
      teamKey={teamKey}
      siloId={siloId}
      authUser={authUser}
      sidebarAction={<SiloSelect teamKey={teamKey} defaultValue={Number(id)} />}
    >
      <SiloProvider teamKey={teamKey} siloId={siloId}>
        {children}
      </SiloProvider>
    </MainDashboardLayout>
  )
}

export default Layout
