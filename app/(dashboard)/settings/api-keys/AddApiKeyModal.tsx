"use client"

import Button from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { Modals, useModals } from "@/hooks/useModals"
import { CheckIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { API_KEY_SCOPES } from "@/constants/scopes"
import { PublicApiScope } from "@/types/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_KEYS_QUERY_KEY } from "@/hooks/useApiKeys"

type Inputs = Record<PublicApiScope, boolean> & {
  description: string
}

const AddApiKeyModal = () => {
  const { activeModal, closeModal } = useModals()
  const queryClient = useQueryClient()
  const isOpen = activeModal === Modals.AddApiKey
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>()

  const { mutate } = useMutation({
    mutationFn: async (data: Inputs) => {
      const { description, ...scopes } = data
      const res = await fetch("/api/settings/api-keys", {
        method: "PUT",
        body: JSON.stringify({
          description,
          scopes: Object
            .entries(scopes)
            .filter(([, value]) => value)
            .map(([key]) => key),
        }),
        headers: {
          "Content-type": "application/json",
        },
      })

      if (!res.ok) throw "Name update failed."
    },
    onSuccess: () => {
      closeModal()
      queryClient.invalidateQueries({ queryKey: API_KEYS_QUERY_KEY })
    },
  })

  const addApiKey: SubmitHandler<Inputs> = async (data) => {
    mutate(data)
  }

  return (
    <SlideOver title="Create API Key" open={isOpen} close={closeModal}>
      <form className="space-y-6" onSubmit={handleSubmit(addApiKey)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-none text-gray-900"
          >
            Description
          </label>
          <input
            type="text"
            id="name"
            className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            placeholder="Used for..."
            required
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <h2
          className="block text-sm font-medium leading-none text-gray-900"
        >
          Scopes
        </h2>
        {API_KEY_SCOPES.map((key) => (
          <div key={key}>
            <label htmlFor={key}>
              <input
                id={key}
                type="checkbox"
                className="mr-3"
                {...register(key)}
              />
              {key}
            </label>
          </div>
        ))}
        <button className="hidden" />
      </form>
      <SlideOver.Actions>
        <Button style="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button loading={isSubmitting} onClick={handleSubmit(addApiKey)}>
          <CheckIcon className="w-5 h-5" />
          Save
        </Button>
      </SlideOver.Actions>
    </SlideOver>
  )
}

export default AddApiKeyModal
