"use client"

import Button from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { Modals, useModals } from "@/hooks/useModals"
import { CheckIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { API_KEY_SCOPES } from "@/constants/scopes"
import { PublicApiScope } from "@/types/types"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { useQueryState } from "next-usequerystate"
import { useApiKey } from "@/utils/api/queries"
import { useEffect } from "react"

type Inputs = Record<PublicApiScope, boolean> & {
  note: string
}

const AddOrEditApiKeyModal = () => {
  const { activeModal, closeModal } = useModals()
  const [id, setId] = useQueryState("id")
  const isOpen = activeModal === Modals.AddOrEditApiKey
  const { data: apiKey } = useApiKey(id ? Number(id) : undefined)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>()

  const getApiKeyUpdater = useOptimisticUpdater('getApiKey')
  const getApiKeysUpdater = useOptimisticUpdater('getApiKeys')

  const { mutate: createApiKey } = useMutation({
    mutationFn: apiClient.createApiKey,
    onSuccess: (data) => {
      closeModal()
      getApiKeysUpdater.insert(data)
    },
    onSettled: getApiKeysUpdater.invalidate,
  })

  const { mutate: updateApiKey } = useMutation({
    mutationFn: apiClient.updateApiKey,
    onMutate: getApiKeyUpdater.update,
    onSuccess: closeModal,
    onSettled: () => {
      getApiKeyUpdater.invalidate()
      getApiKeysUpdater.invalidate()
    }
  })

  const submitApiKey: SubmitHandler<Inputs> = async (inputs) => {
    const { note, ...scopes } = inputs
    const data = {
      note,
      scopes: Object
        .entries(scopes)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .filter((key): key is PublicApiScope => !!key)
    }

    if (id) {
      updateApiKey({
        id: Number(id),
        ...data,
      })

      return
    }

    createApiKey(data)
  }

  useEffect(() => {
    setValue('note', apiKey?.note ?? "")
    API_KEY_SCOPES.forEach((scope) => {
      setValue(scope, apiKey?.scopes.includes(scope) ?? false)
    })
  }, [apiKey, setValue])

  return (
    <SlideOver
      title={`${id ? 'Edit' : 'Create'} API Key`}
      open={isOpen}
      close={closeModal}
      afterLeave={() => {
        setId(null)
      }}
    >
      <form className="space-y-8" onSubmit={handleSubmit(submitApiKey)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-none text-gray-900"
          >
            Note
          </label>
          <input
            type="text"
            id="name"
            className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            required
            {...register("note")}
          />
          <p className="text-gray-500 text-xs mt-2">
            What&apos;s this token used for?
          </p>
          {errors.note?.message && (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.note.message}
            </p>
          )}
        </div>
        <div>
          <h2
            className="block text-sm font-medium leading-none text-gray-900"
          >
            Scopes
          </h2>
          <div className="space-y-2.5 mt-3">
            {API_KEY_SCOPES.map((key) => (
              <div key={key}>
                <label htmlFor={key}>
                  <input
                    id={key}
                    type="checkbox"
                    className="mr-3"
                    {...register(key, {
                      value: apiKey?.scopes.includes(key),
                    })}
                  />
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button className="hidden" />
      </form>
      <SlideOver.Actions>
        <Button style="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button loading={isSubmitting} onClick={handleSubmit(submitApiKey)}>
          <CheckIcon className="w-5 h-5" />
          Save
        </Button>
      </SlideOver.Actions>
    </SlideOver>
  )
}

export default AddOrEditApiKeyModal
