"use client"

import { SelectInput, SelectInputOption } from "@/components/SelectInput"
import { Team } from "@/types/types"
import { useQueryState } from "next-usequerystate"
import { useForm } from "react-hook-form"

type TeamFilterProps = {
  teams: Team[]
}

export const TeamFilter = ({ teams }: TeamFilterProps) => {
  const { register } = useForm()
  const [, setTeam] = useQueryState("team", { shallow: false })

  const onChange = (option?: SelectInputOption) => {
    setTeam(option ? String(option.value) : null)
  }

  return (
    <SelectInput
      isClearable
      id="team"
      name="team"
      placeholder="Filter by team"
      register={register}
      registerOptions={{
        onChange,
      }}
      options={teams.map((team) => ({
        label: team.name,
        value: team.id,
      }))}
    />
  )
}
