"use client"

import {
  CreditCardIcon,
  InformationCircleIcon,
  KeyIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import { SidebarMenuButton } from "@/components/menu/SidebarMenuButton"
import SignoutButton from "@/components/menu/SignoutButton"
import { useTeamKey } from "@/hooks/useTeamKey"

export const SettingsMenu = () => {
  const teamKey = useTeamKey()

  return (
    <>
      <ul className="space-y-4">
        <SidebarMenuButton
          menuItem={{
            name: "Billing",
            href: `/dashboard/${teamKey}/settings/billing`,
            icon: <CreditCardIcon />,
          }}
        />
        <SidebarMenuButton
          menuItem={{
            name: "Team",
            href: `/dashboard/${teamKey}/settings/team`,
            icon: <UsersIcon />,
          }}
        />
        <SidebarMenuButton
          menuItem={{
            name: "Company",
            href: `/dashboard/${teamKey}/settings/company`,
            icon: <InformationCircleIcon />,
          }}
        />
        <SidebarMenuButton
          menuItem={{
            name: "Account",
            href: `/dashboard/${teamKey}/settings/account`,
            icon: <UserIcon />,
          }}
        />
        <SidebarMenuButton
          menuItem={{
            name: "API Keys",
            href: `/dashboard/${teamKey}/settings/api-keys`,
            icon: <KeyIcon />,
          }}
        />
      </ul>
      <div className="pt-4 border-t border-gray-200">
        <SignoutButton />
      </div>
    </>
  )
}
