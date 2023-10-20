"use client"

import { List } from "@/types/types"
import { useQuery } from "@tanstack/react-query"

const useUserLists = () => {
  const { data: lists, isInitialLoading } = useQuery({
    queryKey: ["lists"],
    queryFn: async (): Promise<List[]> =>
      await fetch("/api/lists").then((res) => res.json()),
  })

  return { loading: isInitialLoading, lists: lists || [] }
}

export default useUserLists
