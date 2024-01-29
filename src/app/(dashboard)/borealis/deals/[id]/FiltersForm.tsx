"use client"

import { HorizontalSelectInput } from "@/components/HorizontalSelectInput"
import { useLists } from "@/hooks/useLists"
import { FormProvider, useForm } from "react-hook-form"

type Inputs = {
  filter: string
}

const FORM_INPUT_CLASSNAME = "px-4 sm:px-5 md:px-6 py-4 border-t"
const FILTERS = {
  userIdFilter: "User ID Whitelist",
  userIdBlacklist: "User ID Blacklist",
}

export const FiltersForm = () => {
  const { data: lists } = useLists()
  const methods = useForm<Inputs>()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods

  return (
    <FormProvider {...methods}>
      <form>
        {Object.entries(FILTERS).map(([key, label]) => (
          <div key={key}>
            <HorizontalSelectInput
              isClearable
              placeholder="Select a list..."
              className={FORM_INPUT_CLASSNAME}
              id={key}
              name={key}
              label={label}
              getValue={(value) => value}
              options={
                lists?.items.map((list) => ({
                  label: list.name,
                  value: list.id,
                })) ?? []
              }
            />
          </div>
        ))}
      </form>
    </FormProvider>
  )
}
