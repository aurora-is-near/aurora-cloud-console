"use client"

import { QueryKey } from "@tanstack/react-query"
import { apiClient } from "./client"

export const getQueryKey = <
  K extends keyof typeof apiClient,
  TQueryKey extends QueryKey = QueryKey,
>(
  baseName: K,
  params?: unknown,
): TQueryKey => {
  const queryKey: QueryKey = [baseName, params].filter((x) => x)

  return queryKey as TQueryKey
}
