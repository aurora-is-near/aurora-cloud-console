"use client"

import {
  CubeIcon,
  TicketIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { SubMenuButton } from "@/components/menu/MenuButtons"
import { useTeamKey } from "@/hooks/useTeamKey"

export const AdminMenu = () => {
  const teamKey = useTeamKey()

  return (
    <ul className="space-y-4">
      <SubMenuButton
        name="Team"
        href={`/dashboard/${teamKey}/admin/team`}
        icon={<UserGroupIcon />}
      />
      <SubMenuButton
        name="Silos"
        href={`/dashboard/${teamKey}/admin/silos`}
        icon={<CubeIcon />}
      />
      <SubMenuButton
        name="Deals"
        href={`/dashboard/${teamKey}/admin/deals`}
        icon={<TicketIcon />}
      />
    </ul>
  )
}
