"use client"

import Link from "next/link"
import { useState } from "react"
import { Button, Input } from "@headlessui/react"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { SilosTeams, TeamSummary } from "@/types/types"

type AdminTeamListProps = {
  teamSummaries: TeamSummary[]
  silosTeams: SilosTeams[]
}

const AdminTeamList = ({ teamSummaries, silosTeams }: AdminTeamListProps) => {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <MagnifyingGlassCircleIcon className="w-7 h-7" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        {search.length > 0 && (
          <Button onClick={() => setSearch("")}>
            <XMarkIcon className="w-5 h-5" />
          </Button>
        )}
      </div>
      {teamSummaries
        .filter((team) =>
          team.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((team) => {
          const siloId = silosTeams.find(
            (silo) => silo.team_id === team.id,
          )?.silo_id

          const siloPrefix = siloId ? `/silos/${siloId}` : ""

          return (
            <div
              key={team.id}
              className="flex flex-0 border border-gray-200 p-2 px-4 bg-white hover:bg-slate-800 hover:text-white"
            >
              <Link
                href={`/dashboard/${team.team_key}${siloPrefix}`}
                className="flex w-full text-lg"
              >
                {team.name}
              </Link>
            </div>
          )
        })}
    </div>
  )
}

export default AdminTeamList
