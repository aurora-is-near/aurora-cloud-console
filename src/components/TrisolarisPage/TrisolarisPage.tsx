import Image from "next/image"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { Tabs } from "@/components/Tabs/Tabs"
import { Silo } from "@/types/types"
import { LinkButton } from "@/components/LinkButton"
import { TabCard } from "@/components/TabCard/TabCard"
import { Trisolaris } from "../../../public/static/v2/images/icons"

type IntentsPageProps = {
  silo?: Silo | null
}

export const TrisolarisPage = ({ silo = null }: IntentsPageProps) => {
  if (!silo) {
    return null
  }

  const tabs = [
    {
      title: "About",
      content: (
        <TabCard
          attribution={{
            icon: <Trisolaris />,
            text: "Powered by Trisolaris",
          }}
        >
          <div className="flex flex-col gap-2 text-slate-500">
            <p>
              Get your chain listed on Trisolaris, the first and top DEX on the
              Aurora Networks, providing seamless swapping and deep liquidity.
              By integrating, your blockchain appears on Trisolaris.io as an
              available network. This means users will be able to deploy pools
              on your chain and trade assets from the Trisolaris interface.
            </p>
            <p>
              This integration ensures your blockchain is part of the Aurora
              DeFi ecosystem built for speed, efficiency, and interoperability.
              As demand for virtual chains solutions grows, being listed on
              Trisolaris positions your chain at the forefront of the chain
              abstraction innovation that Aurora is spearheading.
            </p>
          </div>
        </TabCard>
      ),
    },
  ]

  return (
    <DashboardPage>
      <Hero
        title={
          <>
            <Image
              width="48"
              height="48"
              src="/static/v2/images/icons/marketplace/trisolaris.svg"
              alt="Trisolaris Logo"
            />
            Trisolaris
          </>
        }
        description="Get your chain listed on Trisolaris, the first decentralized exchange on the Aurora network."
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/trisolaris.png"
            alt="Trisolaris Preview"
          />
        }
      >
        <LinkButton
          isExternal
          variant="border"
          href="https://www.trisolaris.io/"
          size="lg"
        >
          <span>Open Trisolaris</span>
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </LinkButton>
      </Hero>

      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
