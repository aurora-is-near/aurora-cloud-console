"use client"

import { useTeamContext } from "@/contexts/TeamContext"

const BlockExplorerPage = () => {
  const { team } = useTeamContext()

  return (
    <div>
      <h1>Block Explorer for {team.name}</h1>
      {/* Add your block explorer content here */}
    </div>
  )
}

export default BlockExplorerPage
