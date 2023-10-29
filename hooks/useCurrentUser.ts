"use client"

import { User } from "@/types/types"
import { useQuery } from "@tanstack/react-query"

export const CURRENT_USER_QUERY_KEY = ["current-user"];

const useCurrentUser = () => {
  const { data: user, isInitialLoading } = useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: async (): Promise<User> =>
      await fetch("/api/admin/user").then((res) => res.json()),
  })

  return { loading: isInitialLoading, user }
}

export default useCurrentUser
