import {
  CreditCardIcon,
  InformationCircleIcon,
  UserIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  KeyIcon,
  SquaresPlusIcon,
  PlusCircleIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline"
import { Borealis, Silos } from "@/components/icons"

export type MenuItem = {
  name: string
  href: string
  icon: JSX.Element
}

export const mainNavigation: MenuItem[] = [
  { name: "Borealis", href: "/borealis/deals", icon: <Borealis /> },
  { name: "Silos", href: "/silos", icon: <Silos /> },
  { name: "Users", href: "/users", icon: <UsersIcon /> },
  { name: "Services", href: "/services", icon: <SquaresPlusIcon /> },
]

export const mainAdminNavigation: MenuItem[] = [
  { name: "Teams", href: "/admin/teams", icon: <UserGroupIcon /> },
  { name: "Tokens", href: "/admin/tokens", icon: <CurrencyDollarIcon /> },
]

export const mainExtraNavigation: MenuItem[] = [
  { name: "Settings", href: "/settings/billing", icon: <Cog6ToothIcon /> },
]

export const mainAdminExtraNavigation: MenuItem[] = [
  { name: "Log out", href: "/logout", icon: <ArrowRightOnRectangleIcon /> },
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
  teams: [
    {
      name: "All teams",
      href: "/admin/teams",
      icon: <UserGroupIcon />,
    },
    {
      name: "Add team",
      href: "/admin/teams/add",
      icon: <PlusCircleIcon />,
    },
  ],
  tokens: [
    {
      name: "All tokens",
      href: "/admin/tokens",
      icon: <CurrencyDollarIcon />,
    },
    {
      name: "Add token",
      href: "/admin/tokens/add",
      icon: <PlusCircleIcon />,
    },
  ],
}
