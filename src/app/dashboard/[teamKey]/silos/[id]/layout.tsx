"use client"

import { ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"

import { getTeamSilosByKey } from "@/actions/team-silos/get-team-silos-by-key"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { SiloSelect } from "@/components/SiloSelect"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { SiloProvider } from "@/providers/SiloProvider"
import { queryKeys } from "@/actions/query-keys"

const Layout = ({
  children,
  params: { id, teamKey },
}: {
  children: ReactNode
  params: { id: string; teamKey: string }
}) => {
  const siloId = Number(id)

  const { data: authUser = null } = useQuery({
    queryKey: queryKeys.getAuthUser(),
    queryFn: getAuthUser,
  })

  const { data: silos = [] } = useQuery({
    queryKey: queryKeys.getSilos(teamKey),
    queryFn: async () => getTeamSilosByKey(teamKey),
  })

  return (
    <SiloProvider teamKey={teamKey} siloId={siloId}>
      <MainDashboardLayout
        teamKey={teamKey}
        siloId={siloId}
        authUser={authUser}
        sidebarAction={
          silos.length > 1 ? (
            <SiloSelect silos={silos} defaultValue={Number(id)} />
          ) : undefined
        }
      >
        {children}
      </MainDashboardLayout>
    </SiloProvider>
  )
}

export default Layout
