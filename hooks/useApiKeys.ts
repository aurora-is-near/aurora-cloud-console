"use client"

import { Database } from "@/types/supabase"
import { useQuery } from "@tanstack/react-query"

export const API_KEYS_QUERY_KEY = ["api-keys"]

const useApiKeys = () => {
  const { data, isInitialLoading } = useQuery({
    queryKey: API_KEYS_QUERY_KEY,
    queryFn: async (): Promise<Database['public']['Tables']['api_keys']['Row'][]> =>
      await fetch("/api/admin/api-keys").then((res) => res.json()),
  })

  return { loading: isInitialLoading, apiKeys: data ?? [] }
}

export default useApiKeys
