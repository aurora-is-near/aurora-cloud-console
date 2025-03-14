"use client"

import { useEffect } from "react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { FormProvider, useForm } from "react-hook-form"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { InputWrapper } from "@/components/InputWrapper"
import { Modals } from "@/utils/modals"
import { Deal, Limit } from "@/types/types"
import { reloadDeal } from "@/actions/deals/reload-deal"
import { Input } from "@/components/Input"
import { updateLimit } from "@/actions/limits/update-limit"

type Inputs = {
  limit_value: number
}

export const LimitsModal = ({ deal, limit }: { deal: Deal; limit: Limit }) => {
  const { closeModal, activeModal } = useModals()
  const { teamKey, planId } = useParams()
  const methods = useForm<Inputs>({
    defaultValues: {
      limit_value: limit?.limit_value ?? null,
    },
  })

  const TITLE = {
    GLOBAL: "Total transactions limit",
    USER: "Monthly limit per user",
  }[limit.limit_scope]

  const onSaveClick = async () => {
    const values = methods.getValues()

    await updateLimit(deal.id, limit.id, values.limit_value)

    await reloadDeal(teamKey[0], Number(planId))
    toast.success("Limit updated")
    closeModal()
  }

  useEffect(() => {
    methods.reset({
      limit_value: limit?.limit_value ?? null,
    })
  }, [limit, methods])

  const open = activeModal === Modals.EditPlanLimitsModal

  return (
    <FormProvider {...methods}>
      <SlideOver title={`Edit ${TITLE}`} open={open} close={closeModal}>
        <div className="space-y-8">
          <InputWrapper id="limit_value" inputName="limit_value" label={TITLE}>
            <Input
              id="limit_value"
              name="limit_value"
              register={methods.register}
              defaultValue={limit?.limit_value}
            />
            <p className="text-xs text-gray-500">
              Set to 0 (zero) for unlimited.
            </p>
          </InputWrapper>
        </div>
        <SlideOver.Actions>
          <div className="flex items-center flex-1 justify-between">
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={onSaveClick}>
              <CheckIcon className="w-5 h-5" />
              Save
            </Button>
          </div>
        </SlideOver.Actions>
      </SlideOver>
    </FormProvider>
  )
}
