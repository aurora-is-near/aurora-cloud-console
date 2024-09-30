"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"
import { CheckIcon, TrashIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { Button } from "@/components/Button"
import { Modals } from "@/utils/modals"

type Inputs = {
  name: string
}

type AddOrEditListModalProps = {
  values?: Inputs
  onSubmit: SubmitHandler<Inputs>
  open: boolean
  isPending?: boolean
}

export const AddOrEditListModal = ({
  values,
  onSubmit,
  open,
  isPending,
}: AddOrEditListModalProps) => {
  const { closeModal, openModal } = useModals()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const deleteList = () => {
    openModal(Modals.DeleteList)
  }

  useEffect(() => {
    setValue("name", values?.name ?? "")
  }, [values, setValue])

  return (
    <SlideOver
      title={`${values ? "Edit" : "Create"} list`}
      open={open}
      close={closeModal}
    >
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-none text-gray-900"
          >
            List name
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
        <div
          className={clsx(
            "flex items-center flex-1",
            values ? "justify-between" : "justify-end",
          )}
        >
          {values && (
            <Button
              disabled={isPending}
              variant="secondary"
              onClick={deleteList}
            >
              <TrashIcon className="w-5 h-5 text-gray-900" />
              Delete
            </Button>
          )}
          <div className="flex items-center gap-3">
            <Button
              disabled={isPending}
              variant="secondary"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button loading={isPending} onClick={handleSubmit(onSubmit)}>
              <CheckIcon className="w-5 h-5" />
              Save
            </Button>
          </div>
        </div>
      </SlideOver.Actions>
    </SlideOver>
  )
}
