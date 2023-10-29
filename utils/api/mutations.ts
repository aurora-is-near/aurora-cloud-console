"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "./client"
import { getQueryKey } from "./query-keys"

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiClient.updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey("getCurrentUser"),
      })
    },
  })
}

export const useCreateApiKey = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiClient.createApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey("getApiKeys"),
      })
    },
  })
}

export const useDeleteApiKey = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiClient.deleteApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey("getApiKeys"),
      })
    },
  })
}
