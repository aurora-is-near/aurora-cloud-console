"use client"

import React, { createContext, useContext, useMemo, useState } from "react"
import { Deal, Silo, Team, Token } from "@/types/types"

interface TeamContextType {
  team: Team
  silos: Silo[]
  deals: Deal[]
  tokens: Token[]
  setTeam: (team: Team) => void
  setSilos: (silos: Silo[]) => void
  setDeals: (deals: Deal[]) => void
  setTokens: (tokens: Token[]) => void
}

const TeamContext = createContext<TeamContextType | undefined>(undefined)

export const useTeamContext = () => {
  const context = useContext(TeamContext)

  if (context === undefined) {
    throw new Error("useTeamContext must be used within a TeamProvider")
  }

  return context
}

export const TeamProvider: React.FC<{
  children: React.ReactNode
  initialTeam: Team
  initialSilos: Silo[]
  initialDeals: Deal[]
  initialTokens: Token[]
}> = ({ children, initialTeam, initialSilos, initialDeals, initialTokens }) => {
  const [team, setTeam] = useState<Team>(initialTeam)
  const [silos, setSilos] = useState<Silo[]>(initialSilos)
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [tokens, setTokens] = useState<Token[]>(initialTokens)

  const contextValue = useMemo(() => {
    return {
      team,
      silos,
      deals,
      tokens,
      setTeam,
      setSilos,
      setDeals,
      setTokens,
    }
  }, [team, silos, deals, tokens])

  return (
    <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
  )
}
