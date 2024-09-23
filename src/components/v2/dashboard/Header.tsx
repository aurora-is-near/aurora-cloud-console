"use client"

import Link from "next/link"
import Image from "next/image"
// import { useEffect, useState } from "react"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import AuroraLogo from "@/components/v2/AuroraLogo"
import { useTeamContext } from "@/contexts/TeamContext"
// import { isAdmin } from "@/actions/is-admin"
import SignoutButton from "@/components/v2/SignoutButton"

const SetupAlert = () => {
  const { team } = useTeamContext()

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
  const { silos, team } = useTeamContext()
  // const [isAdminUser, setIsAdminUser] = useState(false)

  // useEffect(() => {
  //   const checkAdminStatus = async () => {
  //     try {
  //       const adminStatus = await isAdmin()

  //       setIsAdminUser(adminStatus)
  //     } catch (error) {
  //       console.error("Error checking admin status:", error)
  //     }
  //   }

  //   void checkAdminStatus()
  // }, [])

  return (
    <>
      {silos.length === 0 && <SetupAlert />}
      <div className="flex flex-row justify-between w-full bg-slate-900 px-4 py-4">
        <AuroraLogo />
        <div className="flex flex-row gap-4 divide-x divide-slate-300 items-center">
          <Link href={`/dashboard_v2/${team.team_key}/settings/billing`}>
            <Cog6ToothIcon className="w-6 h-6 text-slate-300" />
          </Link>
          <SignoutButton />
        </div>
      </div>
    </>
  )
}

export default Header
