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
import { getCurrentTeam } from "@/utils/current-team"
import { headers } from "next/headers"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"

export const getMainNavigation = async (): Promise<MenuItem[]> => {
  const team = await getCurrentTeam(headers())
  const silos = await getTeamSilos(team.id)
  const hasSingleSilo = silos.length === 1

  return [
    { name: "Borealis", href: "/borealis/deals", icon: <Borealis /> },
    {
      name: "Silo",
      href: hasSingleSilo ? `/silos/${silos[0].id}/overview` : "/silos",
      icon: <Silos />,
    },
    { name: "Lists", href: "/lists", icon: <ListBulletIcon /> },
    { name: "Services", href: "/services", icon: <SquaresPlusIcon /> },
  ]
}

export const mainAdminNavigation: MenuItem[] = [
  { name: "Teams", href: "/admin/teams", icon: <UserGroupIcon /> },
  { name: "Tokens", href: "/admin/tokens", icon: <CurrencyDollarIcon /> },
  { name: "Silos", href: "/admin/silos", icon: <Silos /> },
  { name: "Deals", href: "/admin/deals", icon: <TicketIcon /> },
]

export const mainExtraNavigation: MenuItem[] = [
  { name: "Settings", href: "/settings/billing", icon: <Cog6ToothIcon /> },
]

export const mainAdminExtraNavigation: MenuItem[] = [
  { name: "Log out", href: "/logout", icon: <ArrowRightOnRectangleIcon /> },
]
