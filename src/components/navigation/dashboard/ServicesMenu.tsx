"use client"

import { ListBulletIcon } from "@heroicons/react/24/outline"
import { SubMenuButton } from "@/components/menu/MenuButtons"
import { useTeamKey } from "@/hooks/useTeamKey"

export const ServicesMenu = () => {
  const teamKey = useTeamKey()

  return (
    <ul className="space-y-4">
      <SubMenuButton
        href={`/dashboard/${teamKey}/services`}
        name="All services"
        icon={<ListBulletIcon />}
      />
    </ul>
  )
}
