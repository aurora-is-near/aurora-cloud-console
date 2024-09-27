"use client"

import Link from "next/link"
import Image from "next/image"
import AuroraLogo from "@/components/AuroraLogo"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"

const SetupAlert = () => {
  const { team } = useRequiredContext(TeamContext)

  return (
    <div className="flex flex-row w-full bg-slate-600">
      <div className="flex flex-row w-full justify-between py-2">
        <div />
        <span className="text-slate-100">
          You're currently viewing test data and configurations. Set up your own
          devnet or mainnet chain to get started.
        </span>
        <Link href={`/dashboard_v2/${team.team_key}/create_chain`}>
          <div className="flex flex-row gap-2 mx-3 text-slate-100">
            Setup chain
            <Image
              width={10}
              height={10}
              alt=">"
              src="/static/v2/images/rightArrow.svg"
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

const Header = () => {
  const { silos } = useRequiredContext(TeamContext)

  return (
    <>
      {silos.length === 0 && <SetupAlert />}
      <div className="flex flex-row w-full lg:bg-slate-900 lg:px-4 lg:py-4">
        <AuroraLogo />
      </div>
    </>
  )
}

export default Header
