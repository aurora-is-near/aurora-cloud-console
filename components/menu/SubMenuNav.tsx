"use client"

import SignoutButton from "./SignoutButton"
import { SubMenuButton } from "./MenuButtons"
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation"
import { capitalizeFirstLetter } from "@/utils/helpers"
import Heading from "../Heading"
import {
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
  LockClosedIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
  StopCircleIcon,
  UserGroupIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { Silos } from "../icons"
import Loader from "../Loader"
import { getSubroutes } from "@/utils/menu"
import { useDeals } from "@/hooks/useDeals"
import { useSilos } from "@/hooks/useSilos"

const NavLoader = () => (
  <>
    <Loader className="h-12 rounded-lg" />
    <Loader className="h-12 rounded-lg" />
  </>
)

const MenuDivider = () => <div className="w-full h-px bg-gray-200" />

const BorealisMenu = () => {
  const { data, isLoading } = useDeals()

  if (isLoading) return <NavLoader />

  if (!data?.deals.length) return null

  return (
    <ul role="list" className="space-y-4">
      {data.deals.map((deal) => (
        <li key={deal.id}>
          <SubMenuButton
            href={`/borealis/deals/${encodeURIComponent(deal.id)}`}
            name={deal.name}
            icon={<ClipboardDocumentCheckIcon />}
          />
        </li>
      ))}
    </ul>
  )
}

const siloLinks = [
  { name: "Overview", href: "overview", icon: <Silos /> },
  {
    name: "Configuration",
    href: "configuration",
    icon: <WrenchIcon />,
  },
  {
    name: "Permissions",
    href: "permissions",
    icon: <LockClosedIcon />,
  },
  {
    name: "Tokens",
    href: "tokens",
    icon: <StopCircleIcon />,
  },
  {
    name: "KYC",
    href: "kyc",
    icon: <ShieldCheckIcon />,
  },
]

const SiloMenu = () => {
  const [option, setOption] = useState("")
  const { isLoading, data: silos } = useSilos()
  const router = useRouter()
  const [, id, subroute] = useSelectedLayoutSegments()

  useEffect(() => {
    setOption(id ?? "Select silo")
  }, [id])

  if (isLoading) return <NavLoader />

  if (!silos?.length) return null

  return (
    <>
      <div>
        <label htmlFor="silo" className="sr-only">
          Selected silo
        </label>
        <select
          id="silo"
          name="silo"
          className="block w-full py-4 pl-3 pr-8 leading-none text-gray-900 border-0 rounded-md ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600"
          value={option}
          onChange={(e) =>
            router.push(
              `/silos/${e.target.value}${
                subroute ? `/${subroute}` : "/overview"
              }`,
            )
          }
        >
          <option disabled>Select silo</option>
          {silos.map((silo) => (
            <option key={silo.id} value={silo.id}>
              {silo.name}
            </option>
          ))}
        </select>
      </div>
      <ul role="list" className="space-y-4">
        {siloLinks?.map((link) => (
          <li key={link.href}>
            <SubMenuButton
              disabled={!id}
              href={`/silos/${id}/${link.href}`}
              name={link.name}
              icon={link.icon}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

const UsersMenu = () => {
  const { data, isLoading } = useDeals()

  if (isLoading) return <NavLoader />

  if (!data?.deals?.length) return null

  return (
    <ul role="list" className="space-y-4">
      {data.deals.map((deal) => (
        <li key={deal.id}>
          <SubMenuButton
            href={`/users/${encodeURIComponent(deal.id)}`}
            name={deal.name}
            icon={<ClipboardDocumentCheckIcon />}
          />
        </li>
      ))}
    </ul>
  )
}

const AdminTeams = () => (
  <ul role="list" className="space-y-4">
    <li>
      <SubMenuButton
        href="/admin/teams"
        name="All teams"
        icon={<UserGroupIcon />}
      />
    </li>
    <li>
      <SubMenuButton
        href="/admin/teams/add"
        name="Add team"
        icon={<PlusCircleIcon />}
      />
    </li>
  </ul>
)

const AdminTokens = () => (
  <ul role="list" className="space-y-4">
    <li>
      <SubMenuButton
        href="/admin/tokens"
        name="All tokens"
        icon={<CurrencyDollarIcon />}
      />
    </li>
    <li>
      <SubMenuButton
        href="/admin/tokens/add"
        name="Add token"
        icon={<PlusCircleIcon />}
      />
    </li>
  </ul>
)

const AdminSilos = () => (
  <ul role="list" className="space-y-4">
    <li>
      <SubMenuButton href="/admin/silos" name="All silos" icon={<Silos />} />
    </li>
    <li>
      <SubMenuButton
        href="/admin/silos/add"
        name="Add silo"
        icon={<PlusCircleIcon />}
      />
    </li>
  </ul>
)

const menuMap = {
  borealis: <BorealisMenu />,
  silos: <SiloMenu />,
  users: <UsersMenu />,
  settings: null,
}

const adminMenuMap = {
  teams: <AdminTeams />,
  tokens: <AdminTokens />,
  silos: <AdminSilos />,
}

const getSubMenu = (pathname: string, route: string) => {
  if (pathname.startsWith("/admin")) {
    return adminMenuMap[route as keyof typeof adminMenuMap]
  }

  return menuMap[route as keyof typeof menuMap]
}

const SubMenuNav = () => {
  const pathname = usePathname()
  const [route] = useSelectedLayoutSegments()
  const subroutes = getSubroutes(pathname, route)
  const heading = capitalizeFirstLetter(route)
  const subMenu = getSubMenu(pathname, route)

  const isSettingsRoute = route === "settings"

  return (
    <>
      <Heading>{heading}</Heading>

      <nav className="flex flex-col flex-1 gap-y-4">
        <ul role="list" className="space-y-4">
          {subroutes.map((item) => (
            <li key={item.name}>
              <SubMenuButton {...item} />
            </li>
          ))}
        </ul>

        {subMenu ? (
          <>
            <MenuDivider />
            {subMenu}
          </>
        ) : null}

        {isSettingsRoute && (
          <div className="pt-4 border-t border-gray-200">
            <SignoutButton />
          </div>
        )}
      </nav>
    </>
  )
}

export default SubMenuNav
