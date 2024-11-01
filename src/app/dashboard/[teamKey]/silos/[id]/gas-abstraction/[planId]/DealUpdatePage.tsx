"use client"

import { ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { DashboardPage } from "@/components/DashboardPage"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import { Deal } from "@/types/types"
import { LinkButton } from "@/components/LinkButton"
import { SaveChangesBar } from "./SaveChangesBar"
import { DeletePlanButton } from "./DeletePlanButton"

type DealUpdatePageProps = {
  children: ReactNode
  deal: Deal
}

export const DealUpdatePage = ({ children, deal }: DealUpdatePageProps) => {
  const { savePendingUpdates } = useRequiredContext(DealUpdateContext)
  const methods = useForm()
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <DashboardPage
        isForm
        heading={deal.name}
        footer={<SaveChangesBar />}
        formProps={{
          onSubmit: handleSubmit(savePendingUpdates),
        }}
        actions={
          <div className="flex flex-row gap-x-4">
            <LinkButton variant="border" href="/api" isExternal>
              View API
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </LinkButton>
            <DeletePlanButton dealId={deal.id} />
          </div>
        }
      >
        {children}
      </DashboardPage>
    </FormProvider>
  )
}
