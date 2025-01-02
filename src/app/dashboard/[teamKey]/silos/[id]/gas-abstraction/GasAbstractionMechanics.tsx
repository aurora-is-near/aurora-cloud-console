"use client"

import { useId, useState } from "react"
import { CheckIcon } from "@heroicons/react/20/solid"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

import { Modals } from "@/utils/modals"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { Button } from "@/components/Button"
import { Button as Btn, Card, InfoList, Typography } from "@/uikit"
import type { Silo } from "@/types/types"

import { GasPriceForm } from "./GasPriceForm"

type Props = {
  silo: Silo
  baseTokenSymbol: string
}

export const GasAbstractionMechanics = ({ silo, baseTokenSymbol }: Props) => {
  const formId = useId()

  const [gasPriceDisplayed, setGasPriceDisplayed] = useState(
    silo.gas_price ?? 0,
  )

  const { closeModal, openModal, activeModal } = useModals()
  const editModalOpen = activeModal === Modals.EditGasPrice

  return (
    <>
      <Card className="flex flex-col gap-6 md:gap-12 md:flex-row">
        <aside className="w-full">
          <Typography
            variant="heading"
            size={4}
            className="text-slate-900 mb-1"
          >
            Gas mechanics
          </Typography>
          <Typography variant="paragraph" size={4} className="text-slate-500">
            Provides access to the NEAR Explorer for tracking transactions and
            activity.
          </Typography>
        </aside>

        <InfoList className="md:max-w-[50%]">
          <InfoList.Item
            label="Gas method"
            labelTooltip="The way gas is collected on your chain."
          >
            Gas is collected as a variable amount based on the transaction
            complexity.
          </InfoList.Item>

          <InfoList.Item
            label="Gas value"
            labelTooltip="The price of gas on your chain, which defines how much gas is charged per transaction. Refer to the table to have an estimate of price per transaction."
          >
            <div className="flex items-center justify-between gap-2">
              <Typography variant="paragraph" size={4}>
                {`${gasPriceDisplayed} ${baseTokenSymbol} per gas`}
              </Typography>
              <Btn.Iconed
                icon={PencilSquareIcon}
                label="Edit gas price"
                onClick={() => openModal(Modals.EditGasPrice)}
              />
            </div>
          </InfoList.Item>
        </InfoList>
      </Card>

      <SlideOver title="Edit gas price" open={editModalOpen} close={closeModal}>
        <GasPriceForm
          silo={silo}
          formId={formId}
          baseTokenSymbol={baseTokenSymbol}
          onSubmitted={({ gasPrice }) => {
            setGasPriceDisplayed(gasPrice)
            closeModal()
          }}
        />
        <SlideOver.Actions>
          <div className="flex items-center justify-between w-full">
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form={formId}>
              <CheckIcon className="w-5 h-5" />
              Update
            </Button>
          </div>
        </SlideOver.Actions>
      </SlideOver>
    </>
  )
}
