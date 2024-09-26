"use client"

import React, { createContext, useMemo, useState } from "react"
import { Deal, Silo, Team, Token } from "@/types/types"

interface TeamContextType {
  team: Team
  silos: Silo[]
  deals: Deal[]
  tokens: Token[]
}

export const TeamContext = createContext<TeamContextType | null | undefined>(
  undefined,
)

export const TeamProvider: React.FC<{
  children: React.ReactNode
  initialTeam: Team
  initialSilos: Silo[]
  initialDeals: Deal[]
  initialTokens: Token[]
}> = ({ children, initialTeam, initialSilos, initialDeals, initialTokens }) => {
  const [team] = useState<Team>(initialTeam)
  const [silos] = useState<Silo[]>(initialSilos)
  const [deals] = useState<Deal[]>(initialDeals)
  const [tokens] = useState<Token[]>(initialTokens)

  const contextValue = useMemo(() => {
    return {
      team,
      silos,
      deals,
      tokens,
    }
  }, [team, silos, deals, tokens])

  return (
    <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
  )
}
