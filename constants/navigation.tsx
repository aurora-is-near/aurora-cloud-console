import {
  CreditCardIcon,
  InformationCircleIcon,
  UserIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  KeyIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline"
import { Borealis, Silos } from "@/components/icons"

export const mainNavigation = [
  { name: "Borealis", href: "/borealis/deals", icon: <Borealis /> },
  { name: "Silos", href: "/silos", icon: <Silos /> },
  { name: "Users", href: "/users", icon: <UsersIcon /> },
  { name: "Services", href: "/services", icon: <SquaresPlusIcon /> },
]

export const mainExtraNavigation = [
  { name: "Settings", href: "/settings/billing", icon: <Cog6ToothIcon /> },
]

export type SubrouteKeys = "borealis" | "silos" | "users" | "settings"

export const subrouteMap = {
  borealis: [
    {
      name: "Summary",
      href: "/borealis/deals",
      icon: <HomeIcon />,
    },
  ],
  silos: [
    {
      name: "Summary",
      href: "/silos",
      icon: <HomeIcon />,
    },
  ],
  users: [
    {
      name: "All users",
      href: "/users",
      icon: <UsersIcon />,
    },
    // {
    //   name: "Blocked",
    //   href: "/users/blocked",
    //   icon: <NoSymbolIcon />,
    // },
  ],
  settings: [
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
  services: [
    {
      name: "All services",
      href: "/services",
    },
  ],
}
