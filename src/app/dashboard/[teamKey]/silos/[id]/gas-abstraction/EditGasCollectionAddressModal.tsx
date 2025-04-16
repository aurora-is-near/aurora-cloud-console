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
import { Typography } from "@/uikit"
import { Modals } from "@/utils/modals"
import { useModals } from "@/hooks/useModals"
import { Button } from "@/components/Button"
import { HorizontalInput } from "@/components/HorizontalInput"
import { updateSilo } from "@/actions/silos/update-silo"
import SlideOver from "@/components/SlideOver"
import { queryKeys } from "@/actions/query-keys"
import type { Silo, Team } from "@/types/types"

type FormData = {
  address: string
}

type Props = {
  silo: Silo
  team: Team
}

export const EditGasCollectionAddressModal = ({ team, silo }: Props) => {
  const formId = useId()
  const queryClient = useQueryClient()

  const { closeModal, activeModal } = useModals()
  const open = activeModal === Modals.EditGasCollectionAddress

  const formSchema: z.ZodSchema<FormData> = z.object({
    address: z.string().min(1, { message: "Address is required" }),
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
      address: silo.gas_collection_address ?? "",
    },
  })

  const onSave: SubmitHandler<FormData> = async (values: FormData) => {
    try {
      await updateSilo(silo.id, { gas_collection_address: values.address })
      toast.success("Gas collection address successfully.")
      void queryClient
        .invalidateQueries({
          queryKey: queryKeys.getTeamSiloByKey(team.team_key, silo.id),
        })
        .then(closeModal)
      closeModal()
    } catch (e: unknown) {
      logger.error(e)
      toast.error("Gas collection address update failed.", {
        position: "bottom-right",
      })

      return
    }
  }

  const addressFieldValue = watch("address")

  useEffect(() => {
    clearErrors()
  }, [addressFieldValue, clearErrors])

  return (
    <SlideOver
      open={open}
      close={closeModal}
      title="Enter the NEAR address to withdraw gas to"
    >
      <form
        id={formId}
        onSubmit={handleSubmit(onSave)}
        className="flex flex-col gap-4"
      >
        <HorizontalInput
          id="gasPrice"
          name="address"
          placeholder="Near account ID to send collected gas to"
          autoComplete="off"
          errors={errors}
          register={register}
        />
        <Typography variant="paragraph" size={4} className="text-gray-500">
          <strong>⚠️ Only NEAR addresses are supported.</strong> Using any other
          type of address may result in permanent loss of funds.
        </Typography>
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
