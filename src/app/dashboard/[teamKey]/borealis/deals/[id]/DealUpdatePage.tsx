"use client"

import { ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { DashboardPage } from "@/components/DashboardPage"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import { SaveChangesBar } from "./SaveChangesBar"

type DealUpdatePageProps = {
  children: ReactNode
}

export const DealUpdatePage = ({ children }: DealUpdatePageProps) => {
  const { savePendingUpdates } = useRequiredContext(DealUpdateContext)
  const methods = useForm()
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <DashboardPage
        isForm
        footer={<SaveChangesBar />}
        formProps={{
          onSubmit: handleSubmit(savePendingUpdates),
        }}
      >
        {children}
      </DashboardPage>
    </FormProvider>
  )
}
