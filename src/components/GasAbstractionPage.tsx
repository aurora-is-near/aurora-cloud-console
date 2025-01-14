import Image from "next/image"
import type { PropsWithChildren } from "react"

import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { NotAvailableBadge } from "@/components/NotAvailableBadge"

type Props = PropsWithChildren<{
  isNotAvailable?: boolean
}>

export const GasAbstractionPage = async ({
  children,
  isNotAvailable,
}: Props) => (
  <DashboardPage>
    <Hero
      title="Gas Abstraction"
      description="Boost user experience by covering gas fees and creating custom plans as part of your engagement strategy."
      image={
        <Image
          width="180"
          height="180"
          src="/static/v2/images/heroIcons/gas-abstraction.webp"
          className="mr-16 shadow-xl rounded-[2rem]"
          alt=""
        />
      }
      actions={
        isNotAvailable && (
          <NotAvailableBadge>
            Available with your Virtual Chain
          </NotAvailableBadge>
        )
      }
    />
    <div className="flex flex-col gap-14">{children}</div>
  </DashboardPage>
)
