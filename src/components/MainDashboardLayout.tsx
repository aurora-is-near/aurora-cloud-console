import { ReactNode } from "react"
import { HomeIcon } from "@heroicons/react/20/solid"

import { getTeamOnboardingForm } from "@/actions/onboarding/get-onboarding-form"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Deal, Silo, Team } from "@/types/types"

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
  team: Team
  silo?: Silo
  deals?: Deal[]
  showAdminMenu: boolean
  children: ReactNode
  sidebarAction?: JSX.Element
}

export const MainDashboardLayout = async ({
  team,
  silo,
  deals = [],
  showAdminMenu,
  children,
  sidebarAction,
}: MainDashboardLayoutProps) => {
  const siloPrefix = silo ? `/silos/${silo.id}` : ""

  const isOnboardingFormSubmitted = !!(
    team && (await getTeamOnboardingForm(team.id))
  )

  return (
    <DashboardLayout
      team={team}
      silo={silo}
      showWelcomeBanner={!isOnboardingFormSubmitted}
      showAdminMenu={showAdminMenu}
      sidebarMenu={{
        heading: silo?.name ?? "Explore Aurora",
        action: sidebarAction,
        sections: [
          {
            items: [
              {
                name: "Home",
                href: `/dashboard/${team.team_key}${siloPrefix}`,
                icon: <HomeIcon />,
              },
              ...(silo
                ? [
                    {
                      name: "Monitoring",
                      href: `/dashboard/${team.team_key}${siloPrefix}/monitoring`,
                      icon: <Monitoring />,
                    },
                    {
                      name: "Configuration",
                      href: `/dashboard/${team.team_key}${siloPrefix}/configuration`,
                      icon: <Configuration />,
                    },
                  ]
                : []),
              {
                name: "Gas abstraction",
                href: `/dashboard/${team.team_key}${siloPrefix}/gas-abstraction`,
                icon: <GasAbstraction />,
                items: deals.map((deal) => ({
                  name: deal.name,
                  href: `/dashboard/${team.team_key}${siloPrefix}/gas-abstraction/${deal.id}`,
                })),
              },
              {
                name: "Integrations",
                href: `/dashboard/${team.team_key}${siloPrefix}/integrations`,
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
                href: `/dashboard/${team.team_key}${siloPrefix}/onramp`,
                icon: <Onramp />,
                items: [
                  {
                    name: "Universal widget",
                    href: `/dashboard/${team.team_key}${siloPrefix}/onramp/universal-widget`,
                  },
                  {
                    name: "Fiat onramp",
                    href: `/dashboard/${team.team_key}${siloPrefix}/onramp/fiat-to-crypto`,
                  },
                  {
                    name: "Forwarder",
                    href: `/dashboard/${team.team_key}${siloPrefix}/onramp/forwarder`,
                  },
                  {
                    name: "Bridge",
                    href: `/dashboard/${team.team_key}${siloPrefix}/onramp/bridge`,
                  },
                ],
              },
              {
                variant: "secondary",
                name: "Oracle",
                href: `/dashboard/${team.team_key}${siloPrefix}/oracle`,
                icon: <Oracle />,
              },
              {
                variant: "secondary",
                name: "Block explorer",
                href: `/dashboard/${team.team_key}${siloPrefix}/block-explorer`,
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
