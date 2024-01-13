"use client"

import { CheckIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import Button from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"

export type AddOrEditContractModalInputs = {
  name: string
  address: string
}

type AddOrEditContractModalProps = {
  values?: AddOrEditContractModalInputs
  onSubmit: (inputs: AddOrEditContractModalInputs) => void
  open: boolean
  afterLeave?: () => void
}

const AddOrEditContractModal = ({
  values,
  onSubmit,
  open,
  afterLeave,
}: AddOrEditContractModalProps) => {
  const { closeModal } = useModals()
  const {
    setValue,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AddOrEditContractModalInputs>()

  useEffect(() => {
    setValue("address", values?.address ?? "")
    setValue("name", values?.name ?? "")
  }, [values, setValue])

  return (
    <SlideOver
      title={`${values ? "Edit" : "Add"} Contract`}
      open={open}
      close={closeModal}
      afterLeave={afterLeave}
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-none text-gray-900"
          >
            Contract name
          </label>
          <input
            type="text"
            id="name"
            className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            placeholder="Name"
            required
            {...register("name", {
              required: "Please enter a name for the contract.",
            })}
          />
          {errors.name?.message && (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium leading-none text-gray-900"
          >
            Contract address
          </label>
          <input
            type="text"
            id="address"
            className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            placeholder="0x..."
            required
            {...register("address", {
              required: "Please enter the contract´s address.",
            })}
          />
          {errors.address?.message && (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>
        <button type="button" className="hidden" />
      </form>
      <SlideOver.Actions>
        <Button type="secondary" onClick={closeModal}>
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

export default AddOrEditContractModal
