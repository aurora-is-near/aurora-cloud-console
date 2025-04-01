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
    <SiloProvider teamKey={teamKey} siloId={siloId}>
      <MainDashboardLayout
        teamKey={teamKey}
        siloId={siloId}
        authUser={authUser}
        sidebarAction={
          <SiloSelect
            teamKey={teamKey}
            defaultValue={Number(id)}
            className="mt-6"
          />
        }
      >
        {children}
      </MainDashboardLayout>
    </SiloProvider>
  )
}

export default Layout
