"use client"

import Button from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { CheckIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { API_KEY_SCOPES } from "@/constants/scopes"
import { PublicApiScope } from "@/types/types"
import { useEffect } from "react"

type Inputs = Partial<Record<PublicApiScope, boolean>> & {
  note: string,
}

type AddOrEditApiKeyModalProps = {
  values?: Inputs
  onSubmit: (data: {
    note: string,
    scopes: PublicApiScope[]
  }) => void
  open: boolean
  afterLeave?: () => void
}

const AddOrEditApiKeyModal = ({
  values,
  onSubmit,
  open,
  afterLeave,
}: AddOrEditApiKeyModalProps) => {
  const { closeModal } = useModals()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>()

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

    onSubmit(data)
  }

  useEffect(() => {
    setValue('note', values?.note ?? "")
    API_KEY_SCOPES.forEach((scope) => {
      setValue(scope, !!values?.[scope])
    })
  }, [values, setValue])

  return (
    <SlideOver
      title={`${values ? 'Edit' : 'Create'} API Key`}
      open={open}
      close={closeModal}
      afterLeave={afterLeave}
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
            {API_KEY_SCOPES.map((key: PublicApiScope) => (
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
