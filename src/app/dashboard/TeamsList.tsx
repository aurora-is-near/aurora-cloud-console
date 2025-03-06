"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@headlessui/react"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { TeamSummary } from "@/types/types"
import Card from "@/components/Card"
import { Input } from "@/components/Input"

type TeamsListProps = {
  teamSummaries: TeamSummary[]
}

export const TeamsList = ({ teamSummaries }: TeamsListProps) => {
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
            <p className="text-lg text-slate-500">No teams found</p>
          </div>
        )}
        {filteredTeamSummaries.map((teamSummary) => {
          const firstSiloId = teamSummary.silo_ids[0]
          const siloPrefix = firstSiloId ? `/silos/${firstSiloId}` : ""

          return (
            <div
              key={teamSummary.id}
              className="flex flex-0 border border-gray-200 bg-white hover:bg-slate-100 rounded-md text-slate-500 hover:text-slate-700"
            >
              <Link
                href={`/dashboard/${teamSummary.team_key}${siloPrefix}`}
                className="w-full text-lg overflow-hidden whitespace-nowrap text-ellipsis block p-2 px-4"
              >
                {teamSummary.name}
              </Link>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
