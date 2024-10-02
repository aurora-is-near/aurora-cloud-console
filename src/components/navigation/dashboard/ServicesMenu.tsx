"use client"

import { ListBulletIcon } from "@heroicons/react/24/outline"
import { SidebarMenuButton } from "@/components/menu/SidebarMenuButton"
import { useTeamKey } from "@/hooks/useTeamKey"

export const ServicesMenu = () => {
  const teamKey = useTeamKey()

  return (
    <ul className="space-y-4">
      <SidebarMenuButton
        href={`/dashboard/${teamKey}/services`}
        name="All services"
        icon={<ListBulletIcon />}
      />
    </ul>
  )
}
