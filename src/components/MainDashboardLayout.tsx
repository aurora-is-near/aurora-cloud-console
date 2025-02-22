"use client"

import { ReactNode, Suspense } from "react"
import { HomeIcon } from "@heroicons/react/20/solid"

import { useSuspenseQueries } from "@tanstack/react-query"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Spinner } from "@/components/Spinner"
import { SiloSelect } from "@/components/SiloSelect"
import { queries } from "@/actions/queries"
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
  siloId?: number
  children: ReactNode
}

export const MainDashboardLayout = ({
  teamKey,
  siloId,
  children,
}: MainDashboardLayoutProps) => {
  const siloPrefix = siloId ? `/silos/${siloId}` : ""

  const [
    { data: team },
    { data: onboardingForm },
    { data: silos },
    { data: deals },
  ] = useSuspenseQueries({
    queries: [
      queries.getTeamByKey(teamKey),
      queries.getTeamOnboardingFormByKey(teamKey),
      queries.getTeamSilosByKey(teamKey),
      queries.getTeamDealsByKey(teamKey),
    ],
  })

  const silo = silos.find((siloPredicate) => siloPredicate.id === siloId)

  return (
    <Suspense fallback={<Spinner fullScreen size="lg" />}>
      <DashboardLayout
        teamKey={teamKey}
        silo={silo}
        showWelcomeBanner={!onboardingForm}
        sidebarMenu={{
          heading: silo?.name ?? "Explore Aurora",
          action:
            siloId && silos.length > 1 ? (
              <SiloSelect defaultValue={siloId} silos={silos} />
            ) : undefined,
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
    </Suspense>
  )
}
