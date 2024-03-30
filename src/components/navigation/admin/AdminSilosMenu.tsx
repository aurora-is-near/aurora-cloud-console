"use client"

import { Silos } from "@/components/icons"
import { SubMenuButton } from "@/components/menu/MenuButtons"
import { PlusCircleIcon } from "@heroicons/react/24/outline"

export const AdminSilosMenu = () => (
  <ul className="space-y-4">
    <li>
      <SubMenuButton href="/admin/silos" name="All silos" icon={<Silos />} />
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
