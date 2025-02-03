"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@headlessui/react"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { SilosTeams, TeamSummary } from "@/types/types"
import Card from "@/components/Card"
import { Input } from "@/components/Input"

type AdminTeamListProps = {
  teamSummaries: TeamSummary[]
  silosTeams: SilosTeams[]
}

const AdminTeamList = ({ teamSummaries, silosTeams }: AdminTeamListProps) => {
  const [search, setSearch] = useState("")

  const filteredTeamSummaries = teamSummaries.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Card>
      <div className="flex flex-row items-center gap-2 mb-4">
        <MagnifyingGlassCircleIcon className="w-7 h-7" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          id="search"
          name="search"
        />
        {search.length > 0 && (
          <Button onClick={() => setSearch("")}>
            <XMarkIcon className="w-5 h-5" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeamSummaries.length === 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-lg">No teams found</p>
          </div>
        )}
        {filteredTeamSummaries.map((team) => {
          const siloId = silosTeams.find(
            (silo) => silo.team_id === team.id,
          )?.silo_id

          const siloPrefix = siloId ? `/silos/${siloId}` : ""

          return (
            <div
              key={team.id}
              className="flex flex-0 border border-gray-200 p-2 px-4 bg-white hover:bg-slate-100 rounded-md text-slate-500 hover:text-slate-700"
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
    </Card>
  )
}

export default AdminTeamList
