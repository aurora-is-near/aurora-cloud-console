import {
  CreditCardIcon,
  InformationCircleIcon,
  UserIcon,
  HomeIcon,
  UsersIcon,
  KeyIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline"
import { SubMenuItem } from "@/types/menu"
import { useSilos } from "@/hooks/useSilos"

type SubRoute = {
  heading: string
  isLoading?: boolean
  menuItems: SubMenuItem[]
}

export const useSubroutes = (routeSegments: string[]): SubRoute => {
  const { data: silos, isLoading } = useSilos()
  const hasSingleSilo = silos?.items.length === 1

  if (routeSegments[0] === "admin") {
    return { heading: "Admin", menuItems: [] }
  }

  const subrouteMap: Record<string, SubRoute> = {
    borealis: {
      heading: "Borealis",
      menuItems: [
        {
          name: "All deals",
          href: `/dashboard/${routeSegments[1]}/borealis/deals`,
        },
      ],
    },
    silos: {
      heading: `Silo${hasSingleSilo ? "" : "s"}`,
      isLoading,
      menuItems: [
        {
          name: hasSingleSilo ? "Overview" : "Summary",
          href: hasSingleSilo
            ? `/dashboard/${routeSegments[1]}/silos/${silos.items[0].id}/overview`
            : `/dashboard/${routeSegments[1]}/silos`,
          icon: <HomeIcon />,
        },
      ],
    },
    lists: {
      heading: "Lists",
      menuItems: [
        {
          name: "All lists",
          href: `/dashboard/${routeSegments[1]}/lists`,
          icon: <ListBulletIcon />,
        },
      ],
    },
    settings: {
      heading: "Settings",
      menuItems: [
        {
          name: "Billing",
          href: `/dashboard/${routeSegments[1]}/settings/billing`,
          icon: <CreditCardIcon />,
        },
        {
          name: "Team",
          href: `/dashboard/${routeSegments[1]}/settings/team`,
          icon: <UsersIcon />,
        },
        {
          name: "Company",
          href: `/dashboard/${routeSegments[1]}/settings/company`,
          icon: <InformationCircleIcon />,
        },
        {
          name: "Account",
          href: `/dashboard/${routeSegments[1]}/settings/account`,
          icon: <UserIcon />,
        },
        {
          name: "API Keys",
          href: `/dashboard/${routeSegments[1]}/settings/api-keys`,
          icon: <KeyIcon />,
        },
      ],
    },
    services: {
      heading: "Services",
      menuItems: [
        {
          name: "All services",
          href: `/dashboard/${routeSegments[1]}/services`,
        },
      ],
    },
  }

  return subrouteMap[routeSegments[2]] || { heading: "", menuItems: [] }
}
