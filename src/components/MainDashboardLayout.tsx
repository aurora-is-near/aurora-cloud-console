import { ReactNode } from "react"
import { HomeIcon } from "@heroicons/react/20/solid"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Deal, Silo } from "@/types/types"
import {
  BlockExplorer,
  Configuration,
  GasAbstraction,
  Integrations,
  Monitoring,
  Onramp,
  Oracle,
} from "../../public/static/v2/images/menuIcons"

type MainDashboardLayoutProps = {
  teamKey: string
  silo?: Silo
  deals?: Deal[]
  showAdminMenu: boolean
  children: ReactNode
  sidebarAction: JSX.Element
}

export const MainDashboardLayout = async ({
  teamKey,
  silo,
  deals,
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
                name: "Oracle",
                href: `/dashboard/${teamKey}${siloPrefix}/oracle`,
                icon: <Oracle />,
              },
              {
                name: "Onramp",
                href: `/dashboard/${teamKey}${siloPrefix}/onramp`,
                icon: <Onramp />,
                items: [
                  {
                    name: "Universal Widget",
                    href: `/dashboard/${teamKey}${siloPrefix}/onramp/universal-widget`,
                  },
                  {
                    name: "Fiat Onramp",
                    href: `/dashboard/${teamKey}${siloPrefix}/onramp/fiat-to-crypto`,
                  },
                  {
                    name: "Bridge",
                    href: `/dashboard/${teamKey}${siloPrefix}/onramp/bridge`,
                  },
                ],
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
