import Link from "next/link"
import Image from "next/image"
import { getCurrentUser } from "@/actions/current-user/get-current-user"
import { getTeams } from "@/actions/teams/get-teams"
import { isAdmin } from "@/actions/is-admin"

const SetupAlert = () => {
  return (
    <div className="flex flex-row w-full bg-slate-600">
      <div className="flex flex-row w-full justify-between py-2">
        <div />
        <span className="text-slate-100">
          You're currently viewing test data and configurations. Set up your own
          devnet or mainnet chain to get started.
        </span>
        <Link href="/src/app/dashboard_v2/setup">
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

const Header = async () => {
  const [_currentUser, teams, _isAdminUser] = await Promise.all([
    getCurrentUser(),
    getTeams(),
    isAdmin(),
  ])

  return (
    <>
      {teams?.length && <SetupAlert />}
      <div className="flex flex-row w-full lg:bg-slate-900 lg:px-4 lg:py-4">
        <Link
          href="/"
          className="flex h-15 shrink-0 items-center justify-center"
        >
          <div
            className="mr-2 pr-2 py-0.5"
            style={{ borderRight: "1px solid #64748B" }}
          >
            <Image
              width={100}
              height={15}
              src="/static/v2/images/Aurora.svg"
              alt="Aurora"
            />
          </div>
          <Image
            width={100}
            height={15}
            src="/static/v2/images/AuroraCloud.svg"
            alt="AuroraCloud"
          />
        </Link>
      </div>
    </>
  )
}

export default Header
