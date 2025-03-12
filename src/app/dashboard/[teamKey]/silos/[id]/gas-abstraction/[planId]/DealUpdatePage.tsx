"use client"

import { ReactNode } from "react"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { DashboardPage } from "@/components/DashboardPage"
import { Deal } from "@/types/types"
import { LinkButton } from "@/components/LinkButton"
import { DeletePlanButton } from "./DeletePlanButton"

type DealUpdatePageProps = {
  children: ReactNode
  deal: Deal
  siloId: number
}

export const DealUpdatePage = ({
  children,
  deal,
  siloId,
}: DealUpdatePageProps) => {
  return (
    <DashboardPage
      isForm
      heading={deal.name}
      actions={
        <div className="flex flex-row gap-x-4">
          <LinkButton variant="border" href="/api" isExternal>
            View API
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </LinkButton>
          <DeletePlanButton dealId={deal.id} siloId={siloId} />
        </div>
      }
    >
      {children}
    </DashboardPage>
  )
}
