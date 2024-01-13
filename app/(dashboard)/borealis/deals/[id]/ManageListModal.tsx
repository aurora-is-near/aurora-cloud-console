"use client"

import { CheckIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { TrashIcon } from "@heroicons/react/20/solid"
import { useQueryState } from "next-usequerystate"
import { useEffect } from "react"
import Button from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { accessLists } from "./AccessLists"

type Inputs = {
  name: string
  addresses?: string
}

const ManageListModal = () => {
  const [listId, setListId] = useQueryState("listId")
  const { activeModal, closeModal } = useModals()
  const isOpen = activeModal === Modals.ManageList

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>()

  const handleCloseModal = () => {
    setListId(null)
    closeModal()
    reset()
  }

  useEffect(() => {
    const list = accessLists.find((list) => list.id === listId)
    if (list) {
      setValue("name", list.name)
    }
  }, [listId, setValue])

  const addList: SubmitHandler<Inputs> = async () => {
    // const res = await addListAction(id as string, name)

    // TODO: check response, show error or success

    handleCloseModal()
  }

  const deleteList = async () => {
    const confirmed = confirm("Are you sure you want to delete this list?")

    if (confirmed) {
      // TODO:
      console.log(`delete list id: ${listId}`)
    }
  }

  return (
    <SlideOver title="Manage list" open={isOpen} close={handleCloseModal}>
      <form className="pb-6 space-y-6" onSubmit={handleSubmit(addList)}>
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
            placeholder="Name"
            required
            {...register("name", {
              required: "Please enter a name for this list.",
            })}
          />
          {errors.name?.message && (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
      </form>

      <div className="px-4 py-6 -mx-4 border-t sm:-mx-6 sm:px-6">
        <h3 className="block text-sm font-medium text-gray-900">
          Bulk Import with CSV
        </h3>
        <p className="block text-sm text-gray-500">
          Include one address per row.
        </p>
        <Button className="mt-3">Upload CSV</Button>
      </div>

      <div className="px-4 pt-6 -mx-4 border-t sm:-mx-6 sm:px-6">
        <label
          htmlFor="addresses"
          className="block text-sm font-medium text-gray-900"
        >
          Input Addresses Directly
        </label>
        <p className="block text-sm text-gray-500">Add one address per line.</p>
        <textarea
          id="addresses"
          className="block w-full mt-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          placeholder={`0x82os...\n0x38d1...\n0x9sa1...`}
          rows={8}
          required
          {...register("addresses")}
        />
      </div>
      <SlideOver.Actions>
        <div className="flex items-center justify-between flex-1">
          <Button type="secondary" onClick={deleteList}>
            <TrashIcon className="w-5 h-5 text-gray-900" />
            Delete
          </Button>
          <div className="flex items-center gap-3">
            <Button type="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button loading={isSubmitting} onClick={handleSubmit(addList)}>
              <CheckIcon className="w-5 h-5" />
              Save
            </Button>
          </div>
        </div>
      </SlideOver.Actions>
    </SlideOver>
  )
}

export default ManageListModal
