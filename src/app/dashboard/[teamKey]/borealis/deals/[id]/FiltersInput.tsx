"use client"

import { useFormContext } from "react-hook-form"
import Card from "@/components/Card"
import { HorizontalSelectInput } from "@/components/HorizontalSelectInput"
import { useLists } from "@/hooks/useLists"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import { DealSchema } from "@/types/api-schemas"

type FilterInputProps = {
  name:
    | "chainFilterListId"
    | "contractFilterListId"
    | "eoaFilterListId"
    | "eoaBlacklistListId"
  listKey: "chainFilter" | "contractFilter" | "eoaFilter" | "eoaBlacklist"
  label: string
}

const getDefaultValue = (listKey: string, deal: DealSchema) => {
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
    <Card.Row>
      <HorizontalSelectInput
        isClearable
        placeholder="Select a list..."
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
    </Card.Row>
  )
}
