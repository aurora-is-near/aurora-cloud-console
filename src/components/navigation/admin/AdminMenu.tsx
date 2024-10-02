"use client"

import {
  CubeIcon,
  TicketIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { SidebarMenuButton } from "@/components/menu/SidebarMenuButton"
import { useTeamKey } from "@/hooks/useTeamKey"

export const AdminMenu = () => {
  const teamKey = useTeamKey()

  return (
    <ul className="space-y-4">
      <SidebarMenuButton
        name="Team"
        href={`/dashboard/${teamKey}/admin/team`}
        icon={<UserGroupIcon />}
      />
      <SidebarMenuButton
        name="Silos"
        href={`/dashboard/${teamKey}/admin/silos`}
        icon={<CubeIcon />}
      />
      <SidebarMenuButton
        name="Deals"
        href={`/dashboard/${teamKey}/admin/deals`}
        icon={<TicketIcon />}
      />
    </ul>
  )
}
