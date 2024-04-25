"use client"

import { SubMenuButton } from "@/components/menu/MenuButtons"
import { PlusCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline"

export const AdminTeamsMenu = () => (
  <ul className="space-y-4">
    <li>
      <SubMenuButton
        href="/admin/teams"
        name="All teams"
        icon={<UserGroupIcon />}
      />
    </li>
    <li>
      <SubMenuButton
        href="/admin/teams/add"
        name="Add team"
        icon={<PlusCircleIcon />}
      />
    </li>
  </ul>
)
