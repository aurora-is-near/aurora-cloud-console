import Image from "next/image"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { Tabs } from "@/components/Tabs/Tabs"
import { Silo } from "@/types/types"
import { LinkButton } from "@/components/LinkButton"
import Card from "@/components/Card"
import { Blockscout } from "../../../public/static/v2/images/icons"

type BlockExplorerPageProps = {
  silo?: Silo | null
}

export const BlockExplorerPage = ({ silo = null }: BlockExplorerPageProps) => {
  return (
    <DashboardPage>
      <Hero
        title="Block Explorer"
        description="Access a dedicated blockchain explorer for real-time transaction and contract tracking on your chain."
        titlePrefix={
          <Image
            width="48"
            height="48"
            src="/static/v2/images/icons/marketplace/oracle.svg"
            alt="Oracle Logo"
          />
        }
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/block_explorer.png"
            alt="Block Explorer Preview"
          />
        }
        actions={
          silo?.explorer_url && (
            <LinkButton
              isExternal
              variant="border"
              href={silo.explorer_url}
              size="lg"
            >
              <span>Open the explorer</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </LinkButton>
          )
        }
      />

      <Tabs
        tabs={[
          {
            title: "About",
            content: (
              <Card className="divide-y flex flex-col gap-5">
                <div className="flex flex-col gap-2 text-slate-500">
                  <p>
                    Each Virtual Chain is equipped with its own dedicated Block
                    Explorer, providing users with a transparent view of all
                    on-chain activity. The Block Explorer allows users to search
                    for transactions, view wallet addresses, track token
                    transfers, and monitor smart contracts, ensuring full
                    visibility into the blockchain’s operations.
                  </p>
                  <p>
                    Powered by Blockscout, a trusted and open-source solution,
                    the Block Explorer offers a user-friendly interface,
                    detailed analytics, and real-time updates. This tool
                    enhances the accessibility and transparency of your Virtual
                    Chain, making it easier for developers and users to interact
                    with the network and verify transactions.
                  </p>
                </div>
                <div className="pt-5 flex flex-row items-center gap-3">
                  <Blockscout />
                  <span className="text-sm text-slate-600">
                    Powered by BlockScout
                  </span>
                </div>
              </Card>
            ),
          },
        ]}
      />
    </DashboardPage>
  )
}
