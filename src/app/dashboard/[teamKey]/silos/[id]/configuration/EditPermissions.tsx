"use client"

import { useState } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/solid"

import { useQueries } from "@tanstack/react-query"
import { Button } from "@/uikit"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import type {
  Silo,
  SiloWhitelistAddress,
  SiloWhitelistType,
} from "@/types/types"

import { useRequiredContext } from "@/hooks/useRequiredContext"
import { SiloContext } from "@/providers/SiloProvider"
import { TeamContext } from "@/providers/TeamProvider"
import { getSiloWhitelist } from "@/actions/silo-whitelist/get-silo-whitelist"
import { ConfigurationItemsCard } from "./ConfigurationItemsCard"
import { EditSiloPermissionsModal } from "./EditSiloPermissionsModal"

const useDisplayValue = (
  silo: Silo,
  whitelistType: SiloWhitelistType,
  whitelist: SiloWhitelistAddress[],
) => {
  if (
    (whitelistType === "MAKE_TRANSACTION" && silo.is_make_txs_public) ||
    (whitelistType === "DEPLOY_CONTRACT" && silo.is_deploy_contracts_public)
  ) {
    return "Allow everyone"
  }

  if (whitelist.length === 0) {
    return "Forbid everyone"
  }

  return `${whitelist.length} whitelisted addresses`
}

export const EditPermissions = () => {
  const { openModal } = useModals()
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useRequiredContext(SiloContext)

  const [currentModal, setCurrentModal] = useState<SiloWhitelistType | null>(
    null,
  )

  const [{ data: makeTxsWhitelist = [] }, { data: deployTxsWhitelist = [] }] =
    useQueries({
      queries: [
        {
          queryKey: ["silo-whitelist", silo.id, "MAKE_TRANSACTION"],
          queryFn: () => getSiloWhitelist(silo.id, "MAKE_TRANSACTION"),
        },
        {
          queryKey: ["silo-whitelist", silo.id, "DEPLOY_CONTRACT"],
          queryFn: () => getSiloWhitelist(silo.id, "DEPLOY_CONTRACT"),
        },
      ],
    })

  const displayTxsWhitelistLabel = useDisplayValue(
    silo,
    "MAKE_TRANSACTION",
    makeTxsWhitelist,
  )

  const displayDeployWhitelistLabel = useDisplayValue(
    silo,
    "DEPLOY_CONTRACT",
    deployTxsWhitelist,
  )

  return (
    <>
      <EditSiloPermissionsModal
        team={team}
        silo={silo}
        whitelistType={currentModal}
        addresses={
          currentModal
            ? {
                MAKE_TRANSACTION: makeTxsWhitelist,
                DEPLOY_CONTRACT: deployTxsWhitelist,
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
            Action: () => (
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
            Action: () => (
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
