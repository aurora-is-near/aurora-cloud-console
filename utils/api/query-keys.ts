"use client"

import { apiClient } from "./client";

type ApiClient = typeof apiClient;

type ApiClientKey = keyof ApiClient;

type ApiClientQueryParameters<
  K extends ApiClientKey
> = Parameters<ApiClient[K]>[0]

export type ApiClientQueryKey<
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
