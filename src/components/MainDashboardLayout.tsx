import { ReactNode } from "react"
import { HomeIcon } from "@heroicons/react/20/solid"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Silo } from "@/types/types"
import {
  BlockExplorer,
  Configuration,
  GasAbstraction,
  Integrations,
  Monitoring,
  Oracle,
} from "../../public/static/v2/images/menuIcons"

type MainDashboardLayoutProps = {
  teamKey: string
  silo?: Silo
  showAdminMenu: boolean
  children: ReactNode
  sidebarAction: JSX.Element
}

export const MainDashboardLayout = async ({
  teamKey,
  silo,
  showAdminMenu,
  children,
  sidebarAction,
}: MainDashboardLayoutProps) => {
  const siloPrefix = silo ? `/silos/${silo.id}` : ""

  return (
    <DashboardLayout
      teamKey={teamKey}
      showAdminMenu={showAdminMenu}
      sidebarMenu={{
        heading: silo?.name ?? "Explore Aurora",
        action: sidebarAction,
        sections: [
          {
            items: [
              {
                name: "Dashboard",
                href: `/dashboard/${teamKey}${siloPrefix}`,
                icon: <HomeIcon />,
              },
              ...(silo
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
                name: "Gas Abstraction",
                href: `/dashboard/${teamKey}${siloPrefix}/gas-abstraction`,
                icon: <GasAbstraction />,
              },
              {
                disabled: true,
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
                name: "Oracle",
                href: `/dashboard/${teamKey}${siloPrefix}/oracle`,
                icon: <Oracle />,
              },
              {
                name: "Block Explorer",
                href: `/dashboard/${teamKey}${siloPrefix}/block-explorer`,
                icon: <BlockExplorer />,
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
