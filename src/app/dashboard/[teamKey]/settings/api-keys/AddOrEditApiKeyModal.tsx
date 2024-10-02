"use client"

import { CheckIcon } from "@heroicons/react/24/outline"
import { SubmitHandler, useForm } from "react-hook-form"
import { useEffect } from "react"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { API_KEY_SCOPES } from "@/constants/scopes"
import { PublicApiScope } from "@/types/types"

type Inputs = Partial<Record<PublicApiScope, boolean>> & {
  note: string
}

type AddOrEditApiKeyModalProps = {
  values?: Inputs
  onSubmit: (data: { note: string; scopes: PublicApiScope[] }) => void
  open: boolean
}

const AddOrEditApiKeyModal = ({
  values,
  onSubmit,
  open,
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
      scopes: Object.entries(scopes)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .filter((key): key is PublicApiScope => !!key),
    }

    onSubmit(data)
  }

  useEffect(() => {
    setValue("note", values?.note ?? "")
    API_KEY_SCOPES.forEach((scope) => {
      setValue(scope, !!values?.[scope])
    })
  }, [values, setValue])

  return (
    <SlideOver
      title={`${values ? "Edit" : "Create"} API Key`}
      open={open}
      close={closeModal}
    >
      <form className="space-y-8" onSubmit={handleSubmit(submitApiKey)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-none text-slate-900"
          >
            Note
          </label>
          <input
            type="text"
            id="name"
            className="block w-full mt-2.5 rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
            required
            {...register("note")}
          />
          <p className="mt-2 text-xs text-slate-500">
            What&apos;s this token used for?
          </p>
          {errors.note?.message && (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.note.message}
            </p>
          )}
        </div>
        <div>
          <h2 className="block text-sm font-medium leading-none text-slate-900">
            Scopes
          </h2>
          <div className="mt-5 space-y-3">
            {API_KEY_SCOPES.map((key: PublicApiScope) => (
              <div className="relative flex items-start" key={key}>
                <div className="flex items-center h-6">
                  <input
                    id={key}
                    type="checkbox"
                    className="w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-600"
                    {...register(key)}
                  />
                </div>
                <label
                  htmlFor={key}
                  className="ml-3 text-sm leading-6 text-slate-900"
                >
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
      <SlideOver.Actions>
        <Button variant="secondary" onClick={closeModal}>
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
