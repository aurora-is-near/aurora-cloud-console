"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { PencilSquareIcon } from "@heroicons/react/24/solid"

import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import CopyButton from "@/components/CopyButton"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { notReachable } from "@/utils/notReachable"
import { SiloContext } from "@/providers/SiloProvider"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { Button, Card, clsx, InfoList, Skeleton, Typography } from "@/uikit"
import type { Silo, Team } from "@/types/types"

import { GasCollectAction } from "./GasCollectAction"
import { EditGasCollectionAddressModal } from "./EditGasCollectionAddressModal"

const formatTotalCollectedGasValue = (value: number) => {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  }).format(value)
}

type Props = {
  team: Team
  silo: Silo
}

const TotalGasBalance = ({ silo }: Omit<Props, "team">) => {
  const collectedGasTotalQuery = useQuery(
    getQueryFnAndKey("getSiloCollectedGasTotal", {
      id: silo.id,
    }),
  )

  switch (collectedGasTotalQuery.status) {
    case "pending":
    case "error":
      return (
        <InfoList.Item
          label="Gas balance"
          labelTooltip="The amount of gas collected since your last claim."
        >
          <Skeleton />
        </InfoList.Item>
      )
    case "success":
      return (
        <InfoList.Item
          label="Gas balance"
          labelTooltip="The amount of gas collected since your last claim."
          Action={() => (
            <GasCollectAction
              silo={silo}
              availableGas={collectedGasTotalQuery.data.count}
            />
          )}
        >
          {`${formatTotalCollectedGasValue(
            collectedGasTotalQuery.data.count,
          )} ${silo.base_token_symbol}`}
        </InfoList.Item>
      )
    default:
      return notReachable(collectedGasTotalQuery)
  }
}

export const GasAbstractionSettings = ({ team }: { team: Team }) => {
  const { openModal } = useModals()
  const { silo } = useRequiredContext(SiloContext) ?? {}

  return (
    <Card className="flex flex-col gap-6 md:gap-12 md:flex-row">
      <aside className="w-full">
        <Typography variant="heading" size={4} className="text-slate-900 mb-1">
          General settings
        </Typography>
        <Typography variant="paragraph" size={4} className="text-slate-500">
          Virtual Chain configuration sets the key parameters that define your
          blockchain’s network and enable seamless operation.
        </Typography>
      </aside>

      <InfoList className="md:max-w-[50%]">
        <InfoList.Item
          label="Gas token"
          labelTooltip="Gas fees on your chain will be collected in this token."
        >
          {silo.base_token_symbol}
        </InfoList.Item>

        {silo.explorer_url ? (
          <InfoList.Item
            label="Gas collection address"
            labelTooltip="Gas collected on your chain is stored on this address until you claim it."
            Action={() => (
              <>
                {silo.gas_collection_address ? (
                  <CopyButton
                    hasBorder
                    size="sm"
                    value={silo.gas_collection_address}
                  />
                ) : null}
                <Button.Iconed
                  label="Edit"
                  icon={PencilSquareIcon}
                  onClick={() => openModal(Modals.EditGasCollectionAddress)}
                />
              </>
            )}
          >
            <Typography
              size={4}
              variant="paragraph"
              className={clsx("truncate w-full", {
                "text-cyan-600": silo.gas_collection_address,
                "text-slate-500": !silo.gas_collection_address,
              })}
            >
              {silo.gas_collection_address ? (
                <Link
                  target="_blank"
                  href={`${silo.explorer_url}/address/${silo.gas_collection_address}`}
                >
                  {silo.gas_collection_address ?? "Not set"}
                </Link>
              ) : (
                "Not set"
              )}
            </Typography>
          </InfoList.Item>
        ) : null}

        <TotalGasBalance silo={silo} />
      </InfoList>

      <EditGasCollectionAddressModal team={team} silo={silo} />
    </Card>
  )
}
