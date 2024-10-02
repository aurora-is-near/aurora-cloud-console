"use client"

import { HomeIcon } from "@heroicons/react/20/solid"
import { MobileSubMenuButton } from "@/components/menu/MenuButtons"
import { useTeamKey } from "@/hooks/useTeamKey"
import {
  GasAbstraction,
  Integrations,
} from "../../../../../public/static/v2/images/menuIcons"

export const MobileDashboardMenu = () => {
  const teamKey = useTeamKey()

  return (
    <ul className="space-y-2">
      <li key="create_chain">
        <MobileSubMenuButton
          href={`/dashboard/${teamKey}`}
          name="Dashboard"
          icon={<HomeIcon />}
        />
      </li>
      <li key="dashboard">
        <MobileSubMenuButton
          href={`/dashboard/${teamKey}`}
          name="Dashboard"
          icon={<HomeIcon />}
        />
      </li>
      <li key="gas_abstraction">
        <MobileSubMenuButton
          href={`/dashboard/${teamKey}/gas_abstraction`}
          name="Gas Abstraction"
          icon={<GasAbstraction className="w-2 h-2" />}
        />
      </li>
      <li key="integrations">
        <MobileSubMenuButton
          href={`/dashboard/${teamKey}/integrations`}
          name="Integrations"
          icon={<Integrations className="w-2 h-2" />}
        />
      </li>
    </ul>
  )
}
