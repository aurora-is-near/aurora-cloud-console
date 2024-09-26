"use client"

import { ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"

type DealUpdatePageProps = {
  children: ReactNode
}

export const Update = ({ children }: DealUpdatePageProps) => {
  const { savePendingUpdates } = useRequiredContext(DealUpdateContext)
  const methods = useForm()
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(savePendingUpdates)}
        className="flex flex-col pb-10"
      >
        <div className="flex flex-col gap-5">{children}</div>
      </form>
    </FormProvider>
  )
}
