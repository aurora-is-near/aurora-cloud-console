"use client"

import { apiClient } from "@/utils/api/client"
import { useQuery } from "@tanstack/react-query"

const useSilos = () => {
  const { data: silos, isInitialLoading } = useQuery({
    queryKey: ["silos"],
    queryFn: apiClient.getSilos,
  })

  return { loading: isInitialLoading, silos: silos || [] }
}

export default useSilos
