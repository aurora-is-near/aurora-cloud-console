"use client"

import clsx from "clsx"

import { Suspense, useMemo } from "react"
import {
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { useSuspenseQueries } from "@tanstack/react-query"
import AuroraLogo from "@/components/AuroraLogo"
import { MainMenuButton } from "@/components/menu/MainMenuButton"
import { MobileMenuToggleButton } from "@/components/menu/MobileMenuToggleButton"
import { MainMenuLogoutButton } from "@/components/menu/MainMenuLogoutButton"
import type { MenuItem } from "@/types/menu"

import { queries } from "@/actions/queries"
import IconDiscord from "../../../public/static/icons/discord-logo.svg"
import IconTelegram from "../../../public/static/icons/telegram-logo.svg"

type MainMenuProps = {
  teamKey?: string
}

export const MainMenu = ({ teamKey }: MainMenuProps) => {
  const [{ data: showAdminMenu }] = useSuspenseQueries({
    queries: [queries.isAdmin()],
  })

  const menuItems = useMemo(() => {
    const items: MenuItem[] = [
      {
        name: "Documentation",
        href: "https://doc.aurora.dev/aurora-cloud/welcome/about-virtual-chains",
        icon: <BookOpenIcon />,
        isExternal: true,
      },
      {
        name: "Discord",
        href: "https://discord.com/invite/auroralabs",
        icon: <IconDiscord />,
        isExternal: true,
      },
      {
        name: "Telegram",
        href: "https://t.me/aurorasupportteam",
        icon: <IconTelegram />,
        isExternal: true,
      },
    ]

    if (showAdminMenu) {
      items.push({
        name: "Admin",
        href: "/admin",
        icon: <AdjustmentsHorizontalIcon />,
      })
    }

    if (teamKey) {
      items.push({
        name: "Settings",
        href: `/dashboard/${teamKey}/settings/team`,
        icon: <Cog6ToothIcon />,
      })
    }

    return items
  }, [teamKey, showAdminMenu])

  return (
    <div className="flex flex-row justify-between w-full bg-slate-900 px-4 md:px-6 py-4">
      <AuroraLogo />
      <ul className="hidden lg:flex flex-row items-center">
        <Suspense fallback={null}>
          {menuItems.map((item) => (
            <li key={item.name} className="px-2">
              <MainMenuButton {...item} />
            </li>
          ))}
        </Suspense>
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
