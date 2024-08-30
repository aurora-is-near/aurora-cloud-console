"use client"

import { useParams } from "next/navigation"
import {
  mainMenuButtons,
  stackMenuButtons,
} from "@/components/v2/dashboard/LeftMenu/buttons"
import { Team } from "@/types/types"

interface LeftMenuProps {
  team: Team
}

const LeftMenu = ({ team }: LeftMenuProps) => {
  return (
    <div className="w-[320px] flex flex-col gap-5 bg-white border-r-2 border-slate-200 h-full p-6">
      <h1 className="text-slate-900 text-2xl font-bold tracking-tighter">
        {team.name}
      </h1>

      <div className="divide-y flex flex-col gap-3">
        <div className="flex flex-col gap-3 border-slate-200">
          {...mainMenuButtons(team.team_key)}
        </div>
        <div className="flex flex-col gap-3 py-6">
          <h3 className="text-xs font-bold m-3 uppercase text-slate-500">
            Your Stack
          </h3>
          {...stackMenuButtons(team.team_key)}
        </div>
      </div>
    </div>
  )
}

export default LeftMenu
