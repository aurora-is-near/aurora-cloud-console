"use client"

import { HomeIcon, PlusIcon } from "@heroicons/react/20/solid"
import { SidebarMenuButton } from "@/components/menu/SidebarMenuButton"
import { useTeamKey } from "@/hooks/useTeamKey"
import {
  GasAbstraction,
  Integrations,
} from "../../../../public/static/v2/images/menuIcons"

export const DashboardMenu = () => {
  const teamKey = useTeamKey()

  return (
    <ul className="space-y-1">
      <li className="mb-4">
        <SidebarMenuButton
          href={`/dashboard/${teamKey}/borealis`}
          name="Create Aurora Chain"
          icon={<PlusIcon />}
          dark
          disabled
        />
      </li>
      <li>
        <SidebarMenuButton
          href={`/dashboard/${teamKey}`}
          name="Dashboard"
          icon={<HomeIcon />}
        />
      </li>
      <li>
        <SidebarMenuButton
          href={`/dashboard/${teamKey}/borealis/deals`}
          name="Gas Abstraction"
          icon={<GasAbstraction />}
        />
      </li>
      <li>
        <SidebarMenuButton
          disabled
          href={`/dashboard/${teamKey}/integrations`}
          name="Integrations"
          icon={<Integrations />}
        />
      </li>
    </ul>
  )
}
