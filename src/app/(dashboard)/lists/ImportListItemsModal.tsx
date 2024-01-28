"use client"

import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "@/components/Button"
import { CheckIcon } from "@heroicons/react/20/solid"
import { Modals } from "@/utils/modals"
import { useQueryState } from "next-usequerystate"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"

type Inputs = {
  items: string
}

export const ImportListItemsModal = () => {
  const { activeModal, closeModal } = useModals()
  const [id] = useQueryState("id")
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Inputs>()

  const getListItemsUpdater = useOptimisticUpdater("getListItems", {
    id: Number(id),
  })

  const { mutate: createListItems } = useMutation({
    mutationFn: apiClient.createListItems,
    onSuccess: closeModal,
    onSettled: () => {
      getListItemsUpdater.invalidate()
      reset()
    },
  })

  const submitList: SubmitHandler<Inputs> = async (inputs) => {
    const items = inputs.items.split("\n").filter(Boolean)

    createListItems({ id: Number(id), items })
  }

  return (
    <SlideOver
      title="Import items"
      open={activeModal === Modals.ImportListItems}
      close={closeModal}
    >
      <form className="space-y-8" onSubmit={handleSubmit(submitList)}>
        <div>
          <h3 className="block text-sm font-medium text-gray-900">
            Bulk Import with CSV
          </h3>
          <p className="block text-sm text-gray-500">
            Include one item per row.
          </p>
          <Button className="mt-3">Upload CSV</Button>
        </div>

        <div>
          <label
            htmlFor="items"
            className="block text-sm font-medium text-gray-900"
          >
            Input manually
          </label>
          <p className="block text-sm text-gray-500">Add one item per line.</p>
          <textarea
            id="items"
            className="block w-full mt-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            placeholder={`0x82os...\n0x38d1...\n0x9sa1...`}
            rows={8}
            required
            {...register("items")}
          />
        </div>
      </form>
      <SlideOver.Actions>
        <div className="flex items-center flex-1 justify-end">
          <div className="flex items-center gap-3">
            <Button style="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button loading={isSubmitting} onClick={handleSubmit(submitList)}>
              <CheckIcon className="w-5 h-5" />
              Save
            </Button>
          </div>
        </div>
      </SlideOver.Actions>
    </SlideOver>
  )
}
