import clsx from "clsx"

import { User } from "@supabase/supabase-js"
import AuroraLogo from "@/components/AuroraLogo"
import { MainMenuButton } from "@/components/menu/MainMenuButton"
import { MobileMenuToggleButton } from "@/components/menu/MobileMenuToggleButton"
import { MainMenuLogoutButton } from "@/components/menu/MainMenuLogoutButton"
import type { MenuItem } from "@/types/menu"
import { isAdminUser } from "@/utils/admin"

type MainMenuProps = {
  menuItems: MenuItem[]
  authUser: User | null
}

export const MainMenu = ({ menuItems, authUser }: MainMenuProps) => {
  const userTeams: string[] = authUser?.user_metadata.teams || []
  const homeRoute =
    authUser && userTeams.length === 1 && !isAdminUser(authUser?.email)
      ? `/dashboard/${userTeams[0]}`
      : "/dashboard"

  return (
    <div className="flex flex-row justify-between w-full bg-slate-900 px-4 md:px-6 py-4">
      <AuroraLogo href={homeRoute} />
      <ul className="hidden lg:flex flex-row items-center">
        {menuItems.map((item) => (
          <li key={item.name} className="px-2">
            <MainMenuButton {...item} />
          </li>
        ))}
        <li
          className={clsx(menuItems.length && "pl-2 border-l border-slate-700")}
        >
          <MainMenuLogoutButton />
        </li>
      </ul>
      <MobileMenuToggleButton />
    </div>
  )
}
