"use client"

import { z } from "zod"
import toast from "react-hot-toast"
import { useEffect, useId } from "react"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon } from "@heroicons/react/20/solid"
import type { SubmitHandler } from "react-hook-form"

import { logger } from "@/logger"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import { Button } from "@/components/Button"
import { InputField } from "@/components/InputField"
import { updateSilo } from "@/actions/silos/update-silo"
import SlideOver from "@/components/SlideOver"
import { queryKeys } from "@/actions/query-keys"
import type { Silo, Team } from "@/types/types"
import { Typography } from "@/uikit"

type FormData = {
  gasBurn: number
}

type Props = {
  silo: Silo
  team: Team
}

export const EditGasBurnAmountModal = ({ team, silo }: Props) => {
  const formId = useId()
  const queryClient = useQueryClient()

  const { closeModal, activeModal } = useModals()
  const open = activeModal === Modals.EditGasBurn

  const formSchema: z.ZodSchema<FormData> = z.object({
    gasBurn: z.coerce
      .number()
      .min(0, { message: "Must be greater than 0" })
      .max(100, { message: "Must be less than 100" }),
  })

  const {
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      gasBurn: silo.gas_burn_percent ?? 0,
    },
  })

  const onSave: SubmitHandler<FormData> = async (values: FormData) => {
    try {
      await updateSilo(silo.id, { gas_burn_percent: values.gasBurn })
      toast.success("Gas burn percentage updated.")
      await queryClient
        .invalidateQueries({
          queryKey: queryKeys.getTeamSiloByKey(team.team_key, silo.id),
        })
        .then(closeModal)
    } catch (e: unknown) {
      logger.error(e)
      toast.error("Gas burn percentage update failed.", {
        position: "bottom-right",
      })

      return
    }
  }

  const fieldValue = watch("gasBurn")

  useEffect(() => {
    clearErrors()
  }, [fieldValue, clearErrors])

  return (
    <SlideOver open={open} close={closeModal} title="Gas burn">
      <form
        id={formId}
        onSubmit={handleSubmit(onSave)}
        className="flex flex-col gap-4"
      >
        <InputField
          id="gasBurn"
          name="gasBurn"
          label="Set gas burn rate"
          autoComplete="off"
          errors={errors}
          register={register}
          suffix={
            <Typography
              variant="paragraph"
              size={4}
              className="text-gray-500 whitespace-nowrap"
            >
              % of collected gas
            </Typography>
          }
        />
      </form>
      <SlideOver.Actions>
        <div className="flex items-center justify-between w-full">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" form={formId} loading={isSubmitting}>
            <CheckIcon className="w-5 h-5" />
            Update
          </Button>
        </div>
      </SlideOver.Actions>
    </SlideOver>
  )
}
