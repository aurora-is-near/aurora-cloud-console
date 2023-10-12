"use client"

import { List } from "@/types/types"
import { useQuery } from "@tanstack/react-query"

const useUserLists = () => {
  const { data: lists } = useQuery({
    queryKey: ["lists"],
    queryFn: async (): Promise<List[]> =>
      await fetch("/api/lists").then((res) => res.json()),
  })

  return lists || []
}

export default useUserLists
