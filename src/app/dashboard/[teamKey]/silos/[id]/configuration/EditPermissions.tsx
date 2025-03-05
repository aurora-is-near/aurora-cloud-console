"use client"

import { useEffect, useState } from "react"
import { PencilSquareIcon } from "@heroicons/react/24/solid"

import { Button } from "@/uikit"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import type {
  Silo,
  SiloWhitelistAddress,
  SiloWhitelistType,
} from "@/types/types"

import { ConfigurationItemsCard } from "./ConfigurationItemsCard"
import { EditSiloPermissionsModal } from "./EditSiloPermissionsModal"

type Props = {
  silo: Silo
  whitelists: Record<SiloWhitelistType, SiloWhitelistAddress[]>
}

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

export const EditPermissions = ({ silo, whitelists }: Props) => {
  const { openModal } = useModals()
  const [modalOpen, setModalOpen] = useState<SiloWhitelistType | null>(null)

  const displayTxsWhitelistLabel = useDisplayValue(
    silo,
    "MAKE_TRANSACTION",
    whitelists.MAKE_TRANSACTION,
  )

  const displayDeployWhitelistLabel = useDisplayValue(
    silo,
    "DEPLOY_CONTRACT",
    whitelists.DEPLOY_CONTRACT,
  )

  useEffect(() => {
    if (modalOpen) {
      openModal(Modals.EditSiloAddressPermissions)
    }
  }, [modalOpen, openModal])

  return (
    <>
      {modalOpen ? (
        <EditSiloPermissionsModal
          silo={silo}
          whitelistType={modalOpen}
          addresses={modalOpen ? whitelists[modalOpen] : []}
        />
      ) : null}

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
                onClick={() => setModalOpen("MAKE_TRANSACTION")}
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
                onClick={() => setModalOpen("DEPLOY_CONTRACT")}
              />
            ),
          },
        ]}
      />
    </>
  )
}
