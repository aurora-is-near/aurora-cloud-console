import Image from "next/image"
import type { PropsWithChildren } from "react"

import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"

export const GasAbstractionPage = async ({ children }: PropsWithChildren) => (
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
    />
    <div className="flex flex-col gap-14">{children}</div>
  </DashboardPage>
)
