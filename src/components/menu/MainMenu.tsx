import clsx from "clsx"

import { User } from "@supabase/supabase-js"
import { ReactNode } from "react"
import AuroraLogo from "@/components/AuroraLogo"
import { MainMenuButton } from "@/components/menu/MainMenuButton"
import { MobileMenuToggleButton } from "@/components/menu/MobileMenuToggleButton"
import { MainMenuLogoutButton } from "@/components/menu/MainMenuLogoutButton"
import type { MenuItem } from "@/types/menu"
import { isAdminUser } from "@/utils/admin"
import { LinkButton } from "@/components/LinkButton"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/constants/routes"
import { DarkModeToggleButton } from "@/components/menu/DarkModeToggleButton"

type MainMenuProps = {
  menuItems?: MenuItem[]
  authUser: User | null
  isMarketplace?: boolean
  hasDarkModeToggle?: boolean
  children?: ReactNode
}

const getHomeRoute = (
  authUser: User | null,
  userTeams: string[],
  isMarketplace?: boolean,
) => {
  if (isMarketplace) {
    return "/marketplace"
  }

  return authUser && userTeams.length === 1 && !isAdminUser(authUser?.email)
    ? `/dashboard/${userTeams[0]}`
    : "/dashboard"
}

export const MainMenu = ({
  menuItems = [],
  authUser,
  isMarketplace,
  hasDarkModeToggle,
  children,
}: MainMenuProps) => {
  const userTeams: string[] = authUser?.user_metadata.teams || []
  const homeRoute = getHomeRoute(authUser, userTeams, isMarketplace)

  return (
    <div className="flex flex-row justify-between w-full bg-slate-900 px-4 md:px-6 py-4 dark:border-b dark:border-slate-800">
      <div className="flex flex-row items-center">
        <AuroraLogo href={homeRoute} />
        {!!isMarketplace && (
          <div className="ml-4 md:ml-5 flex flex-row items-center border border-slate-600 rounded-full">
            <span className="text-sm md:text-base text-slate-300 font-medium px-2.5 py-2 leading-none">
              Marketplace
            </span>
          </div>
        )}
      </div>

      {children}

      <ul className="hidden lg:flex flex-row items-center">
        {menuItems.map((item) => (
          <li key={item.name} className="px-2">
            <MainMenuButton {...item} />
          </li>
        ))}
        {authUser ? (
          <>
            <li
              className={clsx(
                menuItems.length && "pl-2 border-l border-slate-700",
              )}
            >
              <MainMenuLogoutButton />
            </li>
            {hasDarkModeToggle && (
              <li>
                <DarkModeToggleButton />
              </li>
            )}
          </>
        ) : (
          <div className="flex flex-row items-center gap-x-3">
            <LinkButton
              href={LOGIN_ROUTE}
              variant="border"
              className="text-white"
            >
              Sign in
            </LinkButton>
            <LinkButton href={SIGNUP_ROUTE}>Get started</LinkButton>
            {hasDarkModeToggle && <DarkModeToggleButton />}
          </div>
        )}
      </ul>
      <MobileMenuToggleButton />
    </div>
  )
}
