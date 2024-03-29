"use client"

import SignoutButton from "./SignoutButton"
import { SubMenuButton } from "./MenuButtons"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import Heading from "../Heading"
import {
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
  LockClosedIcon,
  PlusCircleIcon,
  ShieldCheckIcon,
  StopCircleIcon,
  TicketIcon,
  UserGroupIcon,
  WrenchIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"
import { ComponentType, useEffect, useState } from "react"
import { OracleIcon, Silos } from "../icons"
import Loader from "../Loader"
import { useSubroutes } from "@/hooks/useSubroutes"
import { useDeals } from "@/hooks/useDeals"
import { useSilos } from "@/hooks/useSilos"
import { useLists } from "@/hooks/useLists"
import { Modals } from "@/utils/modals"

const MenuItemLoader = () => <Loader className="h-12 rounded-lg" />

const MenuItemsLoader = () => (
  <>
    <MenuItemLoader />
    <MenuItemLoader />
  </>
)

const MenuDivider = () => <div className="w-full h-px bg-gray-200" />

const BorealisMenu = () => {
  const { data, isLoading } = useDeals()
  const [, , teamKey] = useSelectedLayoutSegments()

  if (isLoading) return <MenuItemsLoader />

  if (!data?.items.length) return null

  return (
    <ul className="space-y-4">
      {data.items.map((deal) => (
        <li key={deal.id}>
          <SubMenuButton
            href={`/dashboard/${teamKey}/borealis/deals/${encodeURIComponent(
              deal.id,
            )}`}
            name={deal.name}
            icon={<ClipboardDocumentCheckIcon />}
          />
        </li>
      ))}
    </ul>
  )
}

const SiloMenu = () => {
  const [option, setOption] = useState("")
  const { isLoading, data: silos } = useSilos()
  const router = useRouter()
  const [, , teamKey, id, subroute] = useSelectedLayoutSegments()
  const hasMultipleSilos = (silos?.items.length ?? 0) > 1

  useEffect(() => {
    setOption(id ?? "Select silo")
  }, [id])

  if (isLoading) return <MenuItemsLoader />

  if (!silos?.items.length) return null

  return (
    <>
      {hasMultipleSilos && (
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
                `/dashboard/${teamKey}/silos/${e.target.value}${
                  subroute ? `/${subroute}` : "/overview"
                }`,
              )
            }
          >
            <option disabled>Select silo</option>
            {silos.items.map((silo) => (
              <option key={silo.id} value={silo.id}>
                {silo.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <ul className="space-y-4">
        {hasMultipleSilos && (
          <SubMenuButton
            disabled={!id}
            href={`/dashboard/${teamKey}/silos/${id}/overview`}
            name="Overview"
            icon={<Silos />}
          />
        )}
        <SubMenuButton
          disabled={!id}
          href={`/dashboard/${teamKey}/silos/${id}/configuration`}
          name="Configuration"
          icon={<WrenchIcon />}
        />
        <SubMenuButton
          disabled
          href={`/dashboard/${teamKey}/silos/${id}/permissions`}
          name="Permissions"
          icon={<LockClosedIcon />}
        />
        <SubMenuButton
          disabled={!id}
          href={`/dashboard/${teamKey}/silos/${id}/tokens`}
          name="Tokens"
          icon={<StopCircleIcon />}
        />
        <SubMenuButton
          href={`/dashboard/${teamKey}/silos/${id}/oracle`}
          name="Oracle"
          icon={<OracleIcon />}
        />
        <SubMenuButton
          disabled
          href={`/dashboard/${teamKey}/silos/${id}/kyc`}
          name="KYC"
          icon={<ShieldCheckIcon />}
        />
      </ul>
    </>
  )
}

const ListsMenu = () => {
  const { data, isLoading } = useLists()
  const [, , teamKey] = useSelectedLayoutSegments()

  if (isLoading) return <MenuItemsLoader />

  if (!data?.items?.length) return null

  return (
    <ul className="space-y-4">
      {data.items.map((deal) => (
        <li key={deal.id}>
          <SubMenuButton
            href={`/dashboard/${teamKey}/lists/${deal.id}`}
            name={deal.name}
            icon={<ClipboardDocumentCheckIcon />}
          />
        </li>
      ))}
      <li>
        <SubMenuButton
          href={`/dashboard/${teamKey}/lists?modal=${Modals.AddList}`}
          name="New list"
          icon={<PlusIcon />}
        />
      </li>
    </ul>
  )
}

const AdminTeams = () => (
  <ul className="space-y-4">
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
  <ul className="space-y-4">
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
  <ul className="space-y-4">
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

const AdminDeals = () => (
  <ul className="space-y-4">
    <li>
      <SubMenuButton
        href="/admin/deals"
        name="All deals"
        icon={<TicketIcon />}
      />
    </li>
    <li>
      <SubMenuButton
        href="/admin/deals/add"
        name="Add deal"
        icon={<PlusCircleIcon />}
      />
    </li>
  </ul>
)

const menuMap: Record<string, ComponentType> = {
  borealis: BorealisMenu,
  silos: SiloMenu,
  lists: ListsMenu,
}

const adminMenuMap: Record<string, ComponentType> = {
  teams: AdminTeams,
  tokens: AdminTokens,
  silos: AdminSilos,
  deals: AdminDeals,
}

const getSubMenu = (routeSegments: string[]) => {
  if (routeSegments[0] === "admin") {
    return adminMenuMap[routeSegments[1]]
  }

  return menuMap[routeSegments[0]]
}

const SubMenuNav = () => {
  const routeSegments = useSelectedLayoutSegments()
  const { heading, menuItems, isLoading } = useSubroutes(routeSegments)
  const SubMenu = getSubMenu(routeSegments)
  const isSettingsRoute = routeSegments[2] === "settings"

  return (
    <aside className="inset-y-0 flex-col hidden p-6 overflow-y-auto bg-white border-r border-gray-200 w-72 lg:flex gap-y-7 min-w-[250px]">
      <Heading>{heading}</Heading>

      <nav className="flex flex-col flex-1 gap-y-4">
        <ul className="space-y-4">
          {isLoading ? (
            <MenuItemLoader />
          ) : (
            menuItems.map((item) => (
              <li key={item.name}>
                <SubMenuButton {...item} />
              </li>
            ))
          )}
        </ul>

        {SubMenu ? (
          <>
            <MenuDivider />
            <SubMenu />
          </>
        ) : null}

        {isSettingsRoute && (
          <div className="pt-4 border-t border-gray-200">
            <SignoutButton />
          </div>
        )}
      </nav>
    </aside>
  )
}

export default SubMenuNav
