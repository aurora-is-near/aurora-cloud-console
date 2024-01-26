"use client"

import Card from "@/components/Card"
import AccessSelector from "./AccessSelector"
import AccessLists from "./AccessLists"
import AddListButton from "./AddListButton"
import { useState } from "react"

const ACCESS_OPTIONS = [
  {
    title: "Open List",
    description: "Any wallet address will get free transactions.",
    showAccessLists: false,
  },
  {
    title: "Whitelist",
    description:
      "Only the wallet addresses from the selected segments will get free transactions",
    showAccessLists: true,
  },
]

export const UserAccessCard = () => {
  const [selectedOption, setSelectedOption] = useState(ACCESS_OPTIONS[0])

  return (
    <Card tag="section">
      <Card.Title>User Access</Card.Title>
      <Card.Subtitle>
        Select which users should benefit from this plan.
      </Card.Subtitle>
      <Card.Actions>
        <AddListButton />
      </Card.Actions>

      <AccessSelector
        options={ACCESS_OPTIONS}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      {selectedOption.showAccessLists && <AccessLists />}
    </Card>
  )
}
