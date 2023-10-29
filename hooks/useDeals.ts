"use client"

import { apiClient } from "@/utils/api/client"
import { useQuery } from "@tanstack/react-query"

const useDeals = () => {
  const { data: deals, isInitialLoading } = useQuery({
    queryKey: ["deals"],
    queryFn: apiClient.getDeals,
  })

  return { loading: isInitialLoading, deals: deals || [] }
}

export default useDeals
