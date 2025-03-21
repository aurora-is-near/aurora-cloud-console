"use client"

import { useState } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/solid"

import { useQuery } from "@tanstack/react-query"
import { Button } from "@/uikit"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import { useFeatureFlags } from "@/hooks/useFeatureFlags"
import type { SiloWhitelistType } from "@/types/types"

import { useRequiredContext } from "@/hooks/useRequiredContext"
import { SiloContext } from "@/providers/SiloProvider"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { ConfigurationItemsCard } from "./ConfigurationItemsCard"
import { EditSiloPermissionsModal } from "./EditSiloPermissionsModal"

const useDisplayValue = (data?: {
  isEnabled: boolean
  addresses: string[]
}) => {
  if (!data) {
    return "Loading..."
  }

  const { isEnabled, addresses } = data

  if (!isEnabled) {
    return "Allow everyone"
  }

  if (addresses.length === 0) {
    return "Forbid everyone"
  }

  return `${addresses.length} whitelisted addresses`
}

export const EditPermissions = () => {
  const { openModal } = useModals()
  const { silo } = useRequiredContext(SiloContext)
  const [currentModal, setCurrentModal] = useState<SiloWhitelistType | null>(
    null,
  )

  const { data } = useQuery(
    getQueryFnAndKey("getSiloPermissions", {
      id: silo.id,
    }),
  )

  const makeTxsWhitelist = data?.items.find(
    (item) => item.type === "MAKE_TRANSACTION",
  )

  const deployTxsWhitelist = data?.items.find(
    (item) => item.type === "DEPLOY_CONTRACT",
  )

  const { flags } = useFeatureFlags()
  const isWhitelistsEditingEnabled = flags.silo_whitelist_permissions

  const displayTxsWhitelistLabel = useDisplayValue(makeTxsWhitelist)
  const displayDeployWhitelistLabel = useDisplayValue(deployTxsWhitelist)

  return (
    <>
      <EditSiloPermissionsModal
        silo={silo}
        whitelistType={currentModal}
        addresses={
          currentModal
            ? {
                MAKE_TRANSACTION: makeTxsWhitelist?.addresses ?? [],
                DEPLOY_CONTRACT: deployTxsWhitelist?.addresses ?? [],
              }[currentModal]
            : []
        }
      />

      <ConfigurationItemsCard
        title="Permissions"
        description="Your virtual chain access restrictions and contract deployment support."
        items={[
          {
            term: "Make transactions",
            description: displayTxsWhitelistLabel,
            tooltip:
              "This whitelist contains the list of addresses allowed to interact with your chain.",
            Action: () =>
              isWhitelistsEditingEnabled && (
                <Button.Iconed
                  label="Edit"
                  icon={PencilSquareIcon}
                  onClick={() => {
                    setCurrentModal("MAKE_TRANSACTION")
                    openModal(Modals.EditSiloAddressPermissions)
                  }}
                />
              ),
          },
          {
            term: "Deploy contracts",
            description: displayDeployWhitelistLabel,
            tooltip:
              "This whitelist contains the list of addresses allowed to deploy contracts on your chain.",
            Action: () =>
              isWhitelistsEditingEnabled && (
                <Button.Iconed
                  label="Edit"
                  icon={PencilSquareIcon}
                  onClick={() => {
                    setCurrentModal("DEPLOY_CONTRACT")
                    openModal(Modals.EditSiloAddressPermissions)
                  }}
                />
              ),
          },
        ]}
      />
    </>
  )
}
