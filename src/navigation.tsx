import {
  Cog6ToothIcon,
  SquaresPlusIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  CurrencyDollarIcon,
  TicketIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline"
import { Borealis, Silos } from "@/components/icons"
import { MenuItem } from "@/types/menu"
import { Team } from "@/types/types"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { LOGOUT_ROUTE } from "@/constants/routes"

export const getMainNavigation = async (team: Team): Promise<MenuItem[]> => {
  const silos = await getTeamSilos(team.id)
  const hasSingleSilo = silos.length === 1

  return [
    {
      name: "Borealis",
      href: `/dashboard/${team.team_key}/borealis/deals`,
      icon: <Borealis />,
    },
    {
      name: "Silo",
      href: hasSingleSilo
        ? `/dashboard/${team.team_key}/silos/${silos[0].id}/overview`
        : `/dashboard/${team.team_key}/silos`,
      icon: <Silos />,
    },
    {
      name: "Lists",
      href: `/dashboard/${team.team_key}/lists`,
      icon: <ListBulletIcon />,
    },
    {
      name: "Services",
      href: `/dashboard/${team.team_key}/services`,
      icon: <SquaresPlusIcon />,
    },
  ]
}

export const getMainExtraNavigation = (teamKey: string): MenuItem[] => [
  {
    name: "Settings",
    href: `/dashboard/${teamKey}/settings/billing`,
    icon: <Cog6ToothIcon />,
  },
]
export const mainAdminNavigation: MenuItem[] = [
  { name: "Teams", href: "/admin/teams", icon: <UserGroupIcon /> },
  { name: "Tokens", href: "/admin/tokens", icon: <CurrencyDollarIcon /> },
  { name: "Silos", href: "/admin/silos", icon: <Silos /> },
  { name: "Deals", href: "/admin/deals", icon: <TicketIcon /> },
]

export const mainAdminExtraNavigation: MenuItem[] = [
  { name: "Log out", href: LOGOUT_ROUTE, icon: <ArrowRightOnRectangleIcon /> },
]
