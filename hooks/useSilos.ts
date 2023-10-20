"use client"

import { Silo } from "@/types/types"
import { useQuery } from "@tanstack/react-query"

const useSilos = () => {
  const { data: silos, isInitialLoading } = useQuery({
    queryKey: ["silos"],
    queryFn: async (): Promise<Silo[]> =>
      await fetch("/api/silos").then((res) => res.json()),
  })

  return { loading: isInitialLoading, silos: silos || [] }
}

export default useSilos
