"use client"

import { FilterInput } from "@/app/(dashboard)/borealis/deals/[id]/FiltersInput"
import Card from "@/components/Card"

export const FiltersCard = () => {
  return (
    <Card tag="section">
      <Card.Title>Filters</Card.Title>
      <Card.Subtitle>
        Select which users should benefit from this plan.
      </Card.Subtitle>
      <FilterInput
        name="chainFilterListId"
        listKey="chainFilter"
        label="Chain Filter"
      />
      <FilterInput
        name="contractFilterListId"
        listKey="contractFilter"
        label="Contract Filter"
      />
      <FilterInput
        name="eoaFilterListId"
        listKey="eoaFilter"
        label="EOA Filter"
      />
      <FilterInput
        name="eoaBlacklistListId"
        listKey="eoaBlacklist"
        label="EOA Blacklist"
      />
    </Card>
  )
}
