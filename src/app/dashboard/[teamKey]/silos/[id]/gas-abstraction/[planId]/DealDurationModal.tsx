"use client"

import { CheckIcon } from "@heroicons/react/24/outline"
import { useFormContext } from "react-hook-form"
import { XCircleIcon } from "@heroicons/react/20/solid"
import { useEffect } from "react"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import { DateInput } from "@/components/DateInput"
import { InputWrapper } from "@/components/InputWrapper"
import { Modals } from "@/utils/modals"

type Inputs = {
  startTime: string | null
  endTime: string | null
}

export const DealDurationModal = () => {
  const { closeModal, activeModal } = useModals()
  const { deal, queueUpdate } = useRequiredContext(DealUpdateContext)
  const { register, getValues, setValue } = useFormContext<Inputs>()

  const onSaveClick = async () => {
    const values = getValues()

    queueUpdate({
      name: deal?.name ?? "",
      startTime: values.startTime,
      endTime: values.endTime,
    })

    closeModal()
  }

  const onClear = () => {
    setValue("startTime", null)
    setValue("endTime", null)
  }

  const onCancel = () => {
    onClear()
    closeModal()
  }

  const open = activeModal === Modals.DealDuration

  // Set (or reset) initial values when modal is opened.
  useEffect(() => {
    if (!deal || !open) {
      return
    }

    setValue("startTime", deal.startTime)
    setValue("endTime", deal.endTime)
  }, [deal, open, setValue])

  return (
    <SlideOver title="Restrict deal duration" open={open} close={closeModal}>
      <div className="space-y-8">
        <div className="gap-x-3 flex flex-row">
          <InputWrapper id="startTime" inputName="startTime" label="Start time">
            <DateInput
              id="startTime"
              name="startTime"
              register={register}
              defaultValue={deal?.startTime}
            />
          </InputWrapper>
          <InputWrapper id="endTime" inputName="endTime" label="End time">
            <DateInput
              id="endTime"
              name="endTime"
              register={register}
              defaultValue={deal?.endTime}
            />
          </InputWrapper>
        </div>
      </div>
      <SlideOver.Actions>
        <div className="flex items-center flex-1 justify-between">
          <Button variant="secondary" onClick={onClear}>
            <XCircleIcon className="w-5 h-5 text-gray-900" />
            Clear values
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSaveClick}>
              <CheckIcon className="w-5 h-5" />
              Save
            </Button>
          </div>
        </div>
      </SlideOver.Actions>
    </SlideOver>
  )
}
