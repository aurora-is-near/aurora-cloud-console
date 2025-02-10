"use client"

import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { sentenceCase } from "change-case"
import { useMemo, useState } from "react"
import { Button } from "@headlessui/react"
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline"
import Table from "@/components/Table"
import TableButton from "@/components/TableButton"
import { OnboardingForm, Team } from "@/types/types"
import { formatDate } from "@/utils/helpers"
import { Input } from "@/components/Input"
import { DeleteTeamTableButton } from "./DeleteTeamTableButton"

type Props = {
  teams: Team[]
  onboardingForms: OnboardingForm[]
}

const TeamsTable = ({ teams, onboardingForms }: Props) => {
  const [search, setSearch] = useState("")

  const filteredTeams = useMemo(() => {
    if (!search) {
      return teams
    }

    return teams.filter((team) => {
      return team.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [teams, search])

  return (
    <div className="flex flex-col gap-4">
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
      <Table>
        <Table.TH>ID</Table.TH>
        <Table.TH>Name</Table.TH>
        <Table.TH>Status</Table.TH>
        <Table.TH>Requested base token</Table.TH>
        <Table.TH>Telegram Handle</Table.TH>
        <Table.TH align="center">Created at</Table.TH>
        <Table.TH align="center">Updated at</Table.TH>
        <Table.TH hidden>Actions</Table.TH>
        {filteredTeams.map((team) => {
          const onboardingForm = onboardingForms.find(
            (form) => form.team_id === team.id,
          )

          return (
            <Table.TR key={team.id}>
              <Table.TD>{team.id}</Table.TD>
              <Table.TD>{team.name}</Table.TD>
              <Table.TD>
                {team.onboarding_status
                  ? sentenceCase(team.onboarding_status)
                  : "-"}
              </Table.TD>
              <Table.TD align="center">
                {onboardingForm?.baseToken ?? "-"}
              </Table.TD>
              <Table.TD align="center">
                {onboardingForm?.telegramHandle ? (
                  <a
                    href={`https://t.me/${onboardingForm.telegramHandle.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {onboardingForm.telegramHandle.startsWith("@")
                      ? onboardingForm.telegramHandle
                      : `@${onboardingForm.telegramHandle}`}
                  </a>
                ) : (
                  "-"
                )}
              </Table.TD>
              <Table.TD align="center">{formatDate(team.created_at)}</Table.TD>
              <Table.TD align="center">{formatDate(team.updated_at)}</Table.TD>
              <Table.TD align="right">
                <div className="flex gap-x-3">
                  <TableButton
                    Icon={PencilSquareIcon}
                    srOnlyText={`Edit ${team.name}`}
                    href={`/admin/teams/edit/${team.id}`}
                  />
                  <DeleteTeamTableButton team={team} />
                </div>
              </Table.TD>
            </Table.TR>
          )
        })}
      </Table>
    </div>
  )
}

export default TeamsTable
