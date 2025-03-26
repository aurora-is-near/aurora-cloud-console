"use client"

import { createContext, PropsWithChildren, ReactNode, useMemo } from "react"
import { notFound } from "next/navigation"
import { Silo } from "@/types/types"
import { Spinner } from "@/components/Spinner"
import { useTeamSilo } from "@/hooks/useTeamSilo"

export type SiloContextType = {
  silo: Silo
}

type SiloProviderProps = {
  children: ReactNode
  teamKey: string
  siloId: number
}

export const SiloContext = createContext<SiloContextType | null>(null)

const SiloContextProvider = ({
  children,
  ...ctxProps
}: PropsWithChildren<SiloContextType>) => {
  const ctx = useMemo(() => ctxProps, [ctxProps])

  return <SiloContext.Provider value={ctx}>{children}</SiloContext.Provider>
}

export const SiloProvider = ({
  children,
  teamKey,
  siloId,
}: SiloProviderProps) => {
  const { data: silo, isPending } = useTeamSilo(teamKey, siloId)

  if (isPending) {
    return <Spinner fullScreen size="lg" />
  }

  if (!silo) {
    notFound()
  }

  return <SiloContextProvider silo={silo}>{children}</SiloContextProvider>
}
