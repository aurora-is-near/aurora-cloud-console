"use client"

import { usePathname } from "next/navigation"
import {
  mainMenuButtons,
  settingsMenuButtons,
  stackMenuButtons,
} from "@/components/v2/dashboard/LeftMenu/buttons"

import { useTeamContext } from "@/contexts/TeamContext"

const LeftMenu = () => {
  const { team } = useTeamContext()

  const pathname = usePathname()
  const isSettingsPage = pathname.includes("/settings")

  return (
    <div className="w-[320px] flex flex-col gap-5 bg-white border-r-2 border-slate-200 h-full p-6">
      <h1 className="text-slate-900 text-2xl font-bold tracking-tighter">
        {isSettingsPage ? "Settings" : team.name}
      </h1>

      {isSettingsPage ? (
        <div className="divide-y flex flex-col gap-3">
          <div className="flex flex-col gap-1 border-slate-200">
            {...settingsMenuButtons(team.team_key)}
          </div>
        </div>
      ) : (
        <div className="divide-y flex flex-col gap-3">
          <div className="flex flex-col gap-1 border-slate-200">
            {...mainMenuButtons(team.team_key)}
          </div>
          <div className="flex flex-col gap-1 py-6">
            <h3 className="text-xs font-bold m-3 uppercase text-slate-500">
              Your Stack
            </h3>
            {...stackMenuButtons(team.team_key)}
          </div>
        </div>
      )}
    </div>
  )
}

export default LeftMenu
