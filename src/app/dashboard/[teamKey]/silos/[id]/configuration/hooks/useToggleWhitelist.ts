"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { apiClient } from "@/utils/api/client"
import type { Silo, SiloWhitelistType } from "@/types/types"

import { useProgressiveRetry } from "@/hooks/useProgressiveRetry"

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
  const { retry } = useProgressiveRetry({
    maxRetries: 5,
    onRetriesComplete: () => setIsFailed(true),
  })

  const [isPublic, setIsPublic] = useState<boolean>(
    whitelistType === "MAKE_TRANSACTION"
      ? silo.is_make_txs_public
      : silo.is_deploy_contracts_public,
  )

  const toggleSiloWhitelist = useMutation({
    mutationFn: apiClient.toggleSiloPermissions,
    onError: () => setIsFailed(true),
    onSuccess: (data, variables) => {
      if (data.status === "PENDING") {
        retry(() => toggleSiloWhitelist.mutate(variables))
      } else if (data.status === "SUCCESSFUL") {
        setIsPublic((p) => !p)
        setIsFailed(false)
        onSuccess()
      } else if (data.status === "FAILED") {
        setIsFailed(true)
      }
    },
  })

  const isPending =
    !isFailed &&
    (toggleSiloWhitelist.isPending ||
      toggleSiloWhitelist.data?.status === "PENDING")

  const onToggleWhitelist = (status: string) => {
    toggleSiloWhitelist.mutate({
      id: silo.id,
      isEnabled: status === "restricted",
      action: whitelistType,
    })
  }

  return { isPending, isPublic, isFailed, onToggleWhitelist }
}
