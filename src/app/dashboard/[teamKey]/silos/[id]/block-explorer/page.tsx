import Image from "next/image"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid"
import { notFound } from "next/navigation"
import Hero from "@/components/Hero/Hero"
import Tabs from "@/components/Tabs/Tabs"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { LinkButton } from "@/components/LinkButton"
import { Blockscout } from "../../../../../../../public/static/v2/images/icons"

const AboutTab = () => {
  return (
    <div className="divide-y flex flex-col gap-5">
      <div className="flex flex-col gap-2 text-slate-500">
        <p>
          Each Virtual Chain is equipped with its own dedicated Block Explorer,
          providing users with a transparent view of all on-chain activity. The
          Block Explorer allows users to search for transactions, view wallet
          addresses, track token transfers, and monitor smart contracts,
          ensuring full visibility into the blockchain’s operations.
        </p>
        <p>
          Powered by Blockscout, a trusted and open-source solution, the Block
          Explorer offers a user-friendly interface, detailed analytics, and
          real-time updates. This tool enhances the accessibility and
          transparency of your Virtual Chain, making it easier for developers
          and users to interact with the network and verify transactions.
        </p>
      </div>
      <div className="pt-5 flex flex-row items-center gap-3">
        <Blockscout />
        <span className="text-sm text-slate-600">Powered by BlockScout</span>
      </div>
    </div>
  )
}

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const silo = await getTeamSilo(team.id, Number(id))

  if (!silo) {
    notFound()
  }

  const tabs = [{ title: "About", content: <AboutTab /> }]

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
        button={{
          element: (
            <LinkButton
              variant="border"
              href={silo.explorer_url ?? ""}
              disabled={!silo.explorer_url}
              className="self-start"
              size="lg"
            >
              <span>Open the explorer</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </LinkButton>
          ),
        }}
      />

      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}

export default Page
