"use client"

import { HorizontalSelectInput } from "@/components/HorizontalSelectInput"
import { useLists } from "@/hooks/useLists"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import { useFormContext } from "react-hook-form"

type FilterInputProps = {
  name:
    | "chainFilterListId"
    | "contractFilterListId"
    | "eoaFilterListId"
    | "eoaBlacklistListId"
  listKey: "chainFilter" | "contractFilter" | "eoaFilter" | "eoaBlacklist"
  label: string
}

const getDefaultValue = (listKey: string, deal: any) => {
  const { id, name } = deal?.lists[listKey] ?? {}

  if (id && name) {
    return {
      label: name,
      value: id,
    }
  }

  return undefined
}

export const FilterInput = ({ name, listKey, label }: FilterInputProps) => {
  const { data: lists } = useLists()
  const { register } = useFormContext()
  const { deal, setFilters } = useRequiredContext(DealUpdateContext)

  if (!deal) {
    return null
  }

  return (
    <HorizontalSelectInput
      isClearable
      placeholder="Select a list..."
      className="px-4 sm:px-5 md:px-6 py-4 border-t"
      id={name}
      name={name}
      label={label}
      getValue={(value) => value}
      register={register}
      defaultValue={getDefaultValue(listKey, deal)}
      registerOptions={{
        onChange: (option?: { value: number }) => {
          setFilters({
            [name]: option?.value ?? null,
          })
        },
      }}
      options={
        lists?.items.map((list) => ({
          label: list.name,
          value: list.id,
        })) ?? []
      }
    />
  )
}
