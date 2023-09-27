"use client"

import { Deal, Silo } from "@/types/types"
import { useQuery } from "@tanstack/react-query"

const useSilos = () => {
  const { data: silos } = useQuery({
    queryKey: ["silos"],
    queryFn: async (): Promise<Silo[]> =>
      await fetch("/api/silos").then((res) => res.json()),
  })

  return silos || []
}

export default useSilos
