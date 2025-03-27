"use client"

import { ReactNode, useContext } from "react"
import { HomeIcon } from "@heroicons/react/20/solid"
import { User } from "@supabase/supabase-js"
import { DashboardLayout } from "@/components/DashboardLayout"
import { useTeamDeals } from "@/hooks/useTeamDeals"
import { SiloContext } from "@/providers/SiloProvider"
import {
  BlockExplorer,
  Configuration,
  GasAbstraction,
  Integrations,
  Monitoring,
  Trisolaris,
  Onramp,
  Oracle,
} from "../../public/static/v2/images/menuIcons"

type MainDashboardLayoutProps = {
  teamKey: string
  siloId?: number | null
  authUser: User | null
  children: ReactNode
  sidebarAction?: JSX.Element
}

export const MainDashboardLayout = ({
  teamKey,
  siloId = null,
  authUser,
  children,
  sidebarAction,
}: MainDashboardLayoutProps) => {
  const siloPrefix = siloId ? `/silos/${siloId}` : ""
  const { data: deals } = useTeamDeals(teamKey)
  const { silo } = useContext(SiloContext) ?? {}

  return (
    <DashboardLayout
      teamKey={teamKey}
      authUser={authUser}
      sidebarMenu={{
        heading: silo?.name ?? "Explore Aurora",
        action: sidebarAction,
        sections: [
          {
            items: [
              {
                name: "Home",
                href: `/dashboard/${teamKey}${siloPrefix}`,
                icon: <HomeIcon />,
              },
              ...(siloId
                ? [
                    {
                      name: "Monitoring",
                      href: `/dashboard/${teamKey}${siloPrefix}/monitoring`,
                      icon: <Monitoring />,
                    },
                    {
                      name: "Configuration",
                      href: `/dashboard/${teamKey}${siloPrefix}/configuration`,
                      icon: <Configuration />,
                    },
                  ]
                : []),
              {
                name: "Gas abstraction",
                href: `/dashboard/${teamKey}${siloPrefix}/gas-abstraction`,
                icon: <GasAbstraction />,
                items: deals?.map((deal) => ({
                  name: deal.name,
                  href: `/dashboard/${teamKey}${siloPrefix}/gas-abstraction/${deal.id}`,
                })),
              },
              {
                name: "Integrations",
                href: `/dashboard/${teamKey}${siloPrefix}/integrations`,
                icon: <Integrations />,
              },
            ],
          },
          {
            heading: "Your Stack",
            items: [
              {
                variant: "secondary",
                name: "Onramp",
                href: `/dashboard/${teamKey}${siloPrefix}/onramp`,
                icon: <Onramp />,
                items: [
                  {
                    name: "Universal widget",
                    href: `/dashboard/${teamKey}${siloPrefix}/onramp/universal-widget`,
                  },
                  {
                    name: "Fiat onramp",
                    href: `/dashboard/${teamKey}${siloPrefix}/onramp/fiat-to-crypto`,
                  },
                  {
                    name: "Forwarder",
                    href: `/dashboard/${teamKey}${siloPrefix}/onramp/forwarder`,
                  },
                  {
                    name: "Bridge",
                    href: `/dashboard/${teamKey}${siloPrefix}/onramp/bridge`,
                  },
                ],
              },
              {
                variant: "secondary",
                name: "Oracle",
                href: `/dashboard/${teamKey}${siloPrefix}/oracle`,
                icon: <Oracle />,
              },
              {
                variant: "secondary",
                name: "Block explorer",
                href: `/dashboard/${teamKey}${siloPrefix}/block-explorer`,
                icon: <BlockExplorer />,
              },
              {
                variant: "secondary",
                name: "Trisolaris",
                href: `/dashboard/${teamKey}${siloPrefix}/trisolaris`,
                icon: <Trisolaris />,
              },
            ],
          },
        ],
      }}
    >
      {children}
    </DashboardLayout>
  )
}
