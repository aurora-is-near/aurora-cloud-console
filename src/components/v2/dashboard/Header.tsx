import Link from "next/link"
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
        <Link href="/dashboard/setup">
          <div className="flex flex-row gap-2 mx-3 text-slate-100">
            Setup chain <img alt=">" src="/static/v2/images/rightArrow.svg" />
          </div>
        </Link>
      </div>
    </div>
  )
}

const Header = async () => {
  const [currentUser, teams, isAdminUser] = await Promise.all([
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
            <img
              src="/static/v2/images/Aurora.svg"
              alt="Aurora"
              className="lg:w-100 lg:h-15"
            />
          </div>
          <img
            src="/static/v2/images/AuroraCloud.svg"
            alt="AuroraCloud"
            className="lg:w-84 lg:h-26"
          />
        </Link>
      </div>
    </>
  )
}

export default Header
