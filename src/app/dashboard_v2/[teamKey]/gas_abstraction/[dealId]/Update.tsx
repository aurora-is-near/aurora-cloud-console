"use client"

import { ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { DashboardPage } from "@/components/DashboardPage"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import { ActionsBar } from "./ActionsBar"

type DealUpdatePageProps = {
  children: ReactNode
}

export const Update = ({ children }: DealUpdatePageProps) => {
  const { savePendingUpdates } = useRequiredContext(DealUpdateContext)
  const methods = useForm()
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      {/*<DashboardPage*/}
      {/*  isForm*/}
      {/*  footer={<ActionsBar />}*/}
      {/*  formProps={{*/}
      {/*    onSubmit: handleSubmit(savePendingUpdates),*/}
      {/*  }}*/}
      {/*>*/}
      {/*</DashboardPage>*/}
      <div className="flex flex-col gap-5">{children}</div>
    </FormProvider>
  )
}
