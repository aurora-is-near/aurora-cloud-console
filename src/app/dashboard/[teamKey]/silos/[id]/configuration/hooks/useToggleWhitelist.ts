"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { apiClient } from "@/utils/api/client"
import { useProgressiveRetry } from "@/hooks/useProgressiveRetry"
import type { Silo, SiloWhitelistType } from "@/types/types"

type Args = {
  silo: Silo
  whitelistType: SiloWhitelistType
  onSuccess: () => void
}

export const useToggleWhitelist = ({
  silo,
  whitelistType,
  onSuccess,
}: Args) => {
  const [isFailed, setIsFailed] = useState<boolean>(false)
  const [isPublic, setIsPublic] = useState<boolean>(
    whitelistType === "MAKE_TRANSACTION"
      ? silo.is_make_txs_public
      : silo.is_deploy_contracts_public,
  )

  const { retry } = useProgressiveRetry({
    maxRetries: 5,
    onRetriesComplete: () => setIsFailed(true),
  })

  const toggleSiloWhitelist = useMutation({
    mutationFn: apiClient.toggleSiloPermissions,
    onError: () => {
      setIsFailed(true)
      setIsPublic((p) => !p)
    },
    onSuccess: async (data, variables) => {
      if (data.status === "PENDING") {
        retry(() => toggleSiloWhitelist.mutate(variables))
      } else if (data.status === "SUCCESSFUL") {
        setIsFailed(false)
        onSuccess()
      } else if (data.status === "FAILED") {
        setIsPublic((p) => !p)
        setIsFailed(true)
      }
    },
  })

  const isPending =
    toggleSiloWhitelist.isPending ||
    toggleSiloWhitelist.data?.status === "PENDING"

  const onToggleWhitelist = (status: string) => {
    setIsPublic((p) => !p)
    toggleSiloWhitelist.mutate({
      id: silo.id,
      isEnabled: status === "restricted",
      action: whitelistType,
    })
  }

  return { isPending, isPublic, isFailed, onToggleWhitelist }
}
