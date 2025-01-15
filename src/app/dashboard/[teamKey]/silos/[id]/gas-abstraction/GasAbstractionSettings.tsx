"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import CopyButton from "@/components/CopyButton"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { Card, InfoList, Skeleton, Typography } from "@/uikit"
import { notReachable } from "@/utils/notReachable"
import type { Silo } from "@/types/types"

const formatTotalCollectedGasValue = (value: number) => {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  }).format(value)
}

type Props = {
  silo: Silo
}

const TotalGasBalance = ({ silo }: Props) => {
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

export const GasAbstractionSettings = ({ silo }: Props) => {
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

        {silo.explorer_url && silo.gas_collection_address ? (
          <InfoList.Item
            label="Gas collection address"
            labelTooltip="Gas collected on your chain is stored on this address until you claim it."
          >
            <div className="flex items-center gap-2">
              <Typography
                variant="paragraph"
                size={4}
                className="text-cyan-600 truncate"
              >
                <Link
                  target="_blank"
                  href={`${silo.explorer_url}/address/${silo.gas_collection_address}`}
                >
                  {silo.gas_collection_address}
                </Link>
              </Typography>
              <CopyButton
                hasBorder
                size="sm"
                value={silo.gas_collection_address}
              />
            </div>
          </InfoList.Item>
        ) : null}

        <TotalGasBalance silo={silo} />
      </InfoList>
    </Card>
  )
}
