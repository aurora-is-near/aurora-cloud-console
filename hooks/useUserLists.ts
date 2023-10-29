"use client"

import { apiClient } from "@/utils/api/client"
import { useQuery } from "@tanstack/react-query"

const useUserLists = () => {
  const { data: lists, isInitialLoading } = useQuery({
    queryKey: ["lists"],
    queryFn: apiClient.getLists,
  })

  return { loading: isInitialLoading, lists: lists || [] }
}

export default useUserLists
