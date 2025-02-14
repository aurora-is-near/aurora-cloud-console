import Image from "next/image"
import type { PropsWithChildren } from "react"

import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { NotAvailableBadge } from "@/components/NotAvailableBadge"
import type { Silo } from "@/types/types"

type Props = PropsWithChildren<{
  silo?: Silo | null
}>

export const GasAbstractionPage = async ({ children, silo }: Props) => (
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
    >
      {!silo && (
        <NotAvailableBadge>Available with your Virtual Chain</NotAvailableBadge>
      )}
    </Hero>
    <div className="flex flex-col gap-14">{children}</div>
  </DashboardPage>
)
