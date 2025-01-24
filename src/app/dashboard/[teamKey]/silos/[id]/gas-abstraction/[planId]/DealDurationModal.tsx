"use client"

import { useEffect } from "react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { useFormContext } from "react-hook-form"
import { XCircleIcon } from "@heroicons/react/20/solid"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { DateInput } from "@/components/DateInput"
import { InputWrapper } from "@/components/InputWrapper"
import { Modals } from "@/utils/modals"
import { updateDeal } from "@/actions/deals/update-deal"
import { Deal } from "@/types/types"
import { reloadDeal } from "./page"

type Inputs = {
  start_time: string | null
  end_time: string | null
}

export const DealDurationModal = ({ deal }: { deal: Deal }) => {
  const { closeModal, activeModal } = useModals()
  const { teamKey, planId } = useParams()

  const { register, getValues, setValue } = useFormContext<Inputs>()

  const onSaveClick = async () => {
    const values = getValues()

    await updateDeal(deal.id, {
      start_time: values.start_time,
      end_time: values.end_time,
    })

    await reloadDeal(teamKey[0], Number(planId))
    toast.success("Deal duration updated")
    closeModal()
  }

  const onClear = () => {
    setValue("start_time", null)
    setValue("end_time", null)
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

    setValue("start_time", deal.start_time)
    setValue("end_time", deal.end_time)
  }, [deal, open, setValue])

  return (
    <SlideOver title="Restrict deal duration" open={open} close={closeModal}>
      <div className="space-y-8">
        <div className="gap-x-3 flex flex-row">
          <InputWrapper
            id="start_time"
            inputName="start_time"
            label="Start time"
          >
            <DateInput
              id="start_time"
              name="start_time"
              register={register}
              defaultValue={deal?.start_time}
            />
          </InputWrapper>
          <InputWrapper id="end_time" inputName="end_time" label="End time">
            <DateInput
              id="end_time"
              name="end_time"
              register={register}
              defaultValue={deal?.end_time}
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
