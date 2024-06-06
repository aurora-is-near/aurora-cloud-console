"use client"

import {
  ArrowRightCircleIcon,
  CubeIcon,
  ListBulletIcon,
  LockClosedIcon,
  MagnifyingGlassCircleIcon,
  ShieldCheckIcon,
  StopCircleIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline"
import { MenuItemsLoader } from "@/components/menu/MenuItemsLoader"
import { SubMenuButton } from "@/components/menu/MenuButtons"
import { MenuDivider } from "@/components/menu/MenuDivider"
import { useEffect, useState } from "react"
import { useSilos } from "@/hooks/useSilos"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { useTeamKey } from "@/hooks/useTeamKey"

export const SilosMenu = () => {
  const [option, setOption] = useState("")
  const { isLoading, data: silos } = useSilos()
  const router = useRouter()
  const teamKey = useTeamKey()
  const [, id, subroute] = useSelectedLayoutSegments()
  const hasMultipleSilos = (silos?.items.length ?? 0) > 1

  useEffect(() => {
    setOption(id ?? "Select silo")
  }, [id])

  if (isLoading) return <MenuItemsLoader />

  if (!silos?.items.length) return null

  return (
    <>
      <ul className="space-y-4">
        <SubMenuButton
          href={
            hasMultipleSilos
              ? `/dashboard/${teamKey}/silos`
              : `/dashboard/${teamKey}/silos/${silos.items[0].id}/overview`
          }
          name={hasMultipleSilos ? "Summary" : "Overview"}
          icon={<ListBulletIcon />}
        />
      </ul>

      <MenuDivider />

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
            icon={<CubeIcon />}
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
          disabled={!id}
          href={`/dashboard/${teamKey}/silos/${id}/oracle`}
          name="Oracle"
          icon={<MagnifyingGlassCircleIcon />}
        />
        <SubMenuButton
          disabled={!id}
          href={`/dashboard/${teamKey}/silos/${id}/bridge`}
          name="Bridge"
          icon={<ArrowRightCircleIcon />}
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
