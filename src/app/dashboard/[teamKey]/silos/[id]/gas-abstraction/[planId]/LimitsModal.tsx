"use client"

import { useEffect } from "react"
import { CheckIcon } from "@heroicons/react/24/outline"
import { FormProvider, useForm } from "react-hook-form"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"
import { XCircleIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { InputWrapper } from "@/components/InputWrapper"
import { Modals } from "@/utils/modals"
import { Deal, Limit, LimitScope } from "@/types/types"
import { reloadDeal } from "@/actions/deals/reload-deal"
import { Input } from "@/components/Input"
import { updateLimit } from "@/actions/limits/update-limit"

type Inputs = {
  limit_value: number | null
}

export const defaultLimits: Record<
  string,
  Pick<
    Limit,
    "limit_type" | "limit_scope" | "limit_value" | "duration" | "ui_enabled"
  >
> = {
  GLOBAL: {
    limit_type: "CYCLIC",
    limit_scope: "GLOBAL",
    limit_value: null,
    duration: "P30D",
    ui_enabled: true,
  },
  USER: {
    limit_type: "CYCLIC",
    limit_scope: "USER",
    limit_value: null,
    duration: "P30D",
    ui_enabled: true,
  },
}

export const LimitsModal = ({
  deal,
  limitScope,
  limits,
}: {
  deal: Deal
  limitScope: LimitScope
  limits: Limit[]
}) => {
  const { closeModal, activeModal } = useModals()
  const { teamKey, planId } = useParams()
  const limit =
    limits.find((l) => l.limit_scope === limitScope) ??
    defaultLimits[limitScope]

  const methods = useForm<Inputs>({
    defaultValues: {
      limit_value: limit?.limit_value,
      limit_scope: limit?.limit_scope,
      limit_type: limit?.limit_type,
      duration: limit?.duration,
      ui_enabled: true,
    } as Inputs,
  })

  const TITLE = {
    GLOBAL: "Total transactions limit",
    USER: "Monthly limit per user",
  }[limitScope]

  const onSaveClick = async () => {
    const values = methods.getValues()

    await updateLimit(
      deal.id,
      values.limit_value,
      limitScope,
      limit.limit_type,
      limit.duration,
    )

    await reloadDeal(teamKey[0], Number(planId))
    toast.success("Limit updated")
    closeModal()
  }

  const onClear = () => {
    methods.setValue("limit_value", null)
  }

  useEffect(() => {
    methods.reset({
      limit_value: limit?.limit_value,
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
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty for unlimited.
            </p>
          </InputWrapper>
        </div>
        <SlideOver.Actions>
          <Button variant="secondary" onClick={onClear}>
            <XCircleIcon className="w-5 h-5 text-gray-900" />
            Clear values
          </Button>
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
