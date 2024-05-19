"use client"

import { SubMenuButton } from "@/components/menu/MenuButtons"
import { CubeIcon, PlusCircleIcon } from "@heroicons/react/24/outline"

export const AdminSilosMenu = () => (
  <ul className="space-y-4">
    <li>
      <SubMenuButton href="/admin/silos" name="All silos" icon={<CubeIcon />} />
    </li>
    <li>
      <SubMenuButton
        href="/admin/silos/add"
        name="Add silo"
        icon={<PlusCircleIcon />}
      />
    </li>
  </ul>
)
