"use client"

import SignoutButton from "./SignoutButton"
import { SubMenuButton } from "./MenuButtons"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { capitalizeFirstLetter } from "@/utils/helpers"
import { SubrouteKeys, subrouteMap } from "@/constants/navigation"
import Heading from "../Heading"
import {
  ClipboardDocumentCheckIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  StopCircleIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline"
import useDeals from "@/hooks/useDeals"
import useSilos from "@/hooks/useSilos"
import { useEffect, useState } from "react"
import { Silos } from "../icons"

const MenuDivider = () => <div className="h-px bg-gray-200 w-full" />

const BorealisMenu = () => {
  const deals = useDeals()

  if (!deals.length) return null

  return (
    <ul role="list" className="space-y-4">
      {deals?.map((deal) => (
        <li key={deal.id}>
          <SubMenuButton
            href={"/borealis/deals/" + deal.id}
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
    href: "configure",
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
  const [option, setOption] = useState("Select silo")
  const silos = useSilos()
  const router = useRouter()
  const [, id] = useSelectedLayoutSegments()

  useEffect(() => {
    setOption(id || "Select silo")
  }, [id])

  useEffect(() => {
    if (!option) return
    if (option === "Select silo") return router.push("/silos")
    return router.push(`/silos/${option}/overview`)
  }, [option, router])

  if (!silos.length) return null

  return (
    <>
      <div>
        <label htmlFor="silo" className="sr-only">
          Selected silo
        </label>
        <select
          id="silo"
          name="silo"
          className="block w-full rounded-md border-0 py-4 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 leading-none"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option disabled>Select silo</option>
          {silos.map((silo) => (
            <option key={silo.href} value={silo.href}>
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

const menuMap = {
  borealis: <BorealisMenu />,
  silos: <SiloMenu />,
  settings: null,
}

const SubMenuNav = () => {
  const [route] = useSelectedLayoutSegments()
  const heading = capitalizeFirstLetter(route)
  const subroutes = subrouteMap[route as SubrouteKeys] ?? []
  const subMenu = menuMap[route as SubrouteKeys]
  const isSettingsRoute = route === "settings"

  return (
    <>
      <Heading>{heading}</Heading>

      <nav className="flex flex-1 flex-col gap-y-4">
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
