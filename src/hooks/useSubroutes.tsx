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

export const useSubroutes = (route: string, isAdmin?: boolean): SubRoute => {
  const { data: silos, isLoading } = useSilos()
  const hasSingleSilo = silos?.items.length === 1

  if (isAdmin) {
    return { heading: "Admin", menuItems: [] }
  }

  const subrouteMap: Record<string, SubRoute> = {
    borealis: {
      heading: "Borealis",
      menuItems: [
        {
          name: "All deals",
          href: "/borealis/deals",
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
            ? `/silos/${silos.items[0].id}/overview`
            : "/silos",
          icon: <HomeIcon />,
        },
      ],
    },
    lists: {
      heading: "Lists",
      menuItems: [
        {
          name: "All lists",
          href: "/lists",
          icon: <ListBulletIcon />,
        },
      ],
    },
    settings: {
      heading: "Settings",
      menuItems: [
        {
          name: "Billing",
          href: "/settings/billing",
          icon: <CreditCardIcon />,
        },
        {
          name: "Team",
          href: "/settings/team",
          icon: <UsersIcon />,
        },
        {
          name: "Company",
          href: "/settings/company",
          icon: <InformationCircleIcon />,
        },
        {
          name: "Account",
          href: "/settings/account",
          icon: <UserIcon />,
        },
        {
          name: "API Keys",
          href: "/settings/api-keys",
          icon: <KeyIcon />,
        },
      ],
    },
    services: {
      heading: "Services",
      menuItems: [
        {
          name: "All services",
          href: "/services",
        },
      ],
    },
  }

  return subrouteMap[route] || { heading: "", menuItems: [] }
}
