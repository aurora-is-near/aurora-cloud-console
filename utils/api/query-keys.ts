"use client"

import { apiClient } from "./client";

type ApiClientKey = keyof typeof apiClient;

type ApiClientQueryParameters<
  K extends keyof typeof apiClient
> = Parameters<typeof apiClient[K]>[0]

type ApiClientQueryKey<
  K extends ApiClientKey
> = (string | ApiClientQueryParameters<K>)[]


export const getQueryKey = <K extends ApiClientKey>(
  baseName: K,
  data?: ApiClientQueryParameters<K>,
) => {
  const queryKey: ApiClientQueryKey<K> = [baseName]

  if (data) {
    queryKey.push(data)
  }

  return queryKey
}
