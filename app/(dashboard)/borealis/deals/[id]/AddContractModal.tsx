"use client"

import Button from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { Modals, useModals } from "@/hooks/useModals"
import { CheckIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { addContract as addContractAction } from "./actions/add-contract"
import { useParams } from "next/navigation"

type Inputs = {
  name: string
  address: string
}

const AddContractModal = () => {
  const { activeModal, closeModal } = useModals()
  const isOpen = activeModal === Modals.AddContract
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>()

  const { id } = useParams()

  const addContract: SubmitHandler<Inputs> = async ({ name, address }) => {
    const res = await addContractAction(id as string, name, address)

    // TODO: check response, show error or success

    closeModal()
  }

  return (
    <SlideOver title="Add contract" open={isOpen} close={closeModal}>
      <form className="space-y-6" onSubmit={handleSubmit(addContract)}>
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
        <button className="hidden" />
      </form>
      <SlideOver.Actions>
        <Button style="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button loading={isSubmitting} onClick={handleSubmit(addContract)}>
          <CheckIcon className="w-5 h-5" />
          Save
        </Button>
      </SlideOver.Actions>
    </SlideOver>
  )
}

export default AddContractModal
