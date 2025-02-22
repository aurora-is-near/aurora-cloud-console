import { ReactNode, useMemo } from "react"
import {
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { MainMenu } from "@/components/menu/MainMenu"
import { MenuItem, MenuSection } from "@/types/menu"
import { SidebarMenu } from "@/components/menu/SidebarMenu"
import Helpscout from "@/components/Helpscout"
import { TopPageBanner } from "@/components/TopPageBanner"
import type { Silo, Team } from "@/types/types"

import IconDiscord from "../../public/static/icons/discord-logo.svg"
import IconTelegram from "../../public/static/icons/telegram-logo.svg"

type DashboardLayoutProps = {
  team?: Team
  silo?: Silo
  showAdminMenu: boolean
  showWelcomeBanner?: boolean
  children: ReactNode
  sidebarMenu?: {
    heading: string
    action?: JSX.Element
    sections: MenuSection[]
  }
}

export const DashboardLayout = ({
  team,
  silo,
  showAdminMenu,
  showWelcomeBanner = false,
  children,
  sidebarMenu,
}: DashboardLayoutProps) => {
  const mainMenuItems = useMemo(() => {
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

    if (team) {
      items.push({
        name: "Settings",
        href: `/dashboard/${team.team_key}/settings/team`,
        icon: <Cog6ToothIcon />,
      })
    }

    return items
  }, [team, showAdminMenu])

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {showWelcomeBanner && team && !team?.onboarding_status && !silo && (
        <TopPageBanner team={team} />
      )}
      <MainMenu menuItems={mainMenuItems} />
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden">
        {!!sidebarMenu?.sections.length && (
          <SidebarMenu
            heading={sidebarMenu.heading}
            sections={sidebarMenu.sections}
            action={sidebarMenu.action}
          />
        )}
        <div className="w-full">{children}</div>
      </div>
      {process.env.NODE_ENV === "production" && !!team?.team_key && (
        <Helpscout />
      )}
    </div>
  )
}
