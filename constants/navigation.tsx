import {
  CreditCardIcon,
  InformationCircleIcon,
  LockClosedIcon,
  UserIcon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import { Borealis, Silos } from "@/components/icons"

export const mainNavigation = [
  { name: "Borealis", href: "/borealis/deals", icon: <Borealis /> },
  { name: "Silos", href: "/silos", icon: <Silos /> },
  { name: "Users", href: "/users", icon: <UsersIcon /> },
]

export const mainExtraNavigation = [
  { name: "Settings", href: "/settings/billing", icon: <Cog6ToothIcon /> },
]

export type SubrouteKeys = "borealis" | "silos" | "settings"

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
  settings: [
    {
      name: "Billing",
      href: "/settings/billing",
      icon: <CreditCardIcon />,
    },
    {
      name: "Permissions",
      href: "/settings/permissions",
      icon: <LockClosedIcon />,
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
  ],
}
