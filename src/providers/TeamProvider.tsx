"use client"

import { createContext, PropsWithChildren, ReactNode, useMemo } from "react"
import { notFound } from "next/navigation"
import { Team } from "@/types/types"
import { Spinner } from "@/components/Spinner"
import { useTeam } from "@/hooks/useTeam"

export type TeamContextType = {
  team: Team
}

type TeamProviderProps = {
  children: ReactNode
  teamKey: string
}

export const TeamContext = createContext<TeamContextType | null>(null)

const TeamContextProvider = ({
  children,
  ...ctxProps
}: PropsWithChildren<TeamContextType>) => {
  const ctx = useMemo(() => ctxProps, [ctxProps])

  return <TeamContext.Provider value={ctx}>{children}</TeamContext.Provider>
}

export const TeamProvider = ({ children, teamKey }: TeamProviderProps) => {
  const { data: team, isPending } = useTeam(teamKey)

  if (isPending) {
    return <Spinner fullScreen size="lg" />
  }

  if (!team) {
    notFound()
  }

  return <TeamContextProvider team={team}>{children}</TeamContextProvider>
}
