"use client"

import { User } from "@/types/types"
import { useQuery } from "@tanstack/react-query"

const QUERY_KEY = ["current-user"];

const useCurrentUser = () => {
  const { data: user, isInitialLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async (): Promise<User> =>
      await fetch("/api/user").then((res) => res.json()),
  })

  return { loading: isInitialLoading, user }
}

export default useCurrentUser
