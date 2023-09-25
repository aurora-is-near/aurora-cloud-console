"use client"

import { Deal } from "@/types/types"
import { useQuery } from "@tanstack/react-query"

const useDeals = () => {
  const { data: deals } = useQuery({
    queryKey: ["deals"],
    queryFn: async (): Promise<Deal[]> =>
      await fetch("/api/borealis/deals").then((res) => res.json()),
  })

  return deals || []
}

export default useDeals
