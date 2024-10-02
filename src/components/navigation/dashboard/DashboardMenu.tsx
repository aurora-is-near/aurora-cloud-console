"use client"

import { HomeIcon, PlusIcon } from "@heroicons/react/20/solid"
import { SubMenuButton } from "@/components/menu/MenuButtons"
import { useTeamKey } from "@/hooks/useTeamKey"
import {
  GasAbstraction,
  Integrations,
} from "../../../../public/static/v2/images/menuIcons"

export const DashboardMenu = () => {
  const teamKey = useTeamKey()

  return (
    <ul className="space-y-1">
      <li key="create_chain" className="mb-4">
        <SubMenuButton
          href={`/dashboard/${teamKey}/borealis`}
          name="Create Aurora Chain"
          icon={<PlusIcon />}
          dark
          disabled
        />
      </li>
      <li key="dashboard">
        <SubMenuButton
          href={`/dashboard/${teamKey}`}
          name="Dashboard"
          icon={<HomeIcon />}
        />
      </li>
      <li key="gas_abstraction">
        <SubMenuButton
          href={`/dashboard/${teamKey}/gas_abstraction`}
          name="Gas Abstraction"
          icon={<GasAbstraction className="w-2 h-2" />}
        />
      </li>
      <li key="integrations">
        <SubMenuButton
          href={`/dashboard/${teamKey}/integrations`}
          name="Integrations"
          icon={<Integrations className="w-2 h-2" />}
        />
      </li>
    </ul>
  )
}
