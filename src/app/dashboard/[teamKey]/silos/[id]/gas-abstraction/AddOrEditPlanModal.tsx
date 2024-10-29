"use client"

import { CheckIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"

type Inputs = {
  name: string
}

type AddOrEditPlanModalProps = {
  values?: Inputs
  onSubmit: (data: Inputs) => void
  open: boolean
}

export const AddOrEditPlanModal = ({
  values,
  onSubmit,
  open,
}: AddOrEditPlanModalProps) => {
  const { closeModal } = useModals()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>()

  useEffect(() => {
    setValue("name", values?.name ?? "")
  }, [values, setValue])

  return (
    <SlideOver
      title={`${values ? "Edit" : "Create"} Plan`}
      open={open}
      close={closeModal}
    >
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-none text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            required
            {...register("name")}
          />
          {errors.name?.message && (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
      </form>
      <SlideOver.Actions>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
          <CheckIcon className="w-5 h-5" />
          Save
        </Button>
      </SlideOver.Actions>
    </SlideOver>
  )
}
