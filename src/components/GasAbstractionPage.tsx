import Image from "next/image"
import { ReactNode } from "react"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { Silo } from "@/types/types"

type GasAbstractionPageProps = {
  teamKey: string
  silo?: Silo | null
  children?: ReactNode
}

export const GasAbstractionPage = async ({
  teamKey,
  silo = null,
  children,
}: GasAbstractionPageProps) => {
  return (
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
}
