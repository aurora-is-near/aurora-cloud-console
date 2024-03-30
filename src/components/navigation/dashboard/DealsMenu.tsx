"use client"

import {
  ClipboardDocumentCheckIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline"
import { MenuItemsLoader } from "@/components/menu/MenuItemsLoader"
import { SubMenuButton } from "@/components/menu/MenuButtons"
import { MenuDivider } from "@/components/menu/MenuDivider"
import { useDeals } from "@/hooks/useDeals"
import { useSelectedLayoutSegments } from "next/navigation"

export const DealsMenu = () => {
  const [, , teamKey] = useSelectedLayoutSegments()
  const { data, isLoading } = useDeals()

  if (isLoading) {
    return <MenuItemsLoader />
  }

  if (!data?.items?.length) {
    return null
  }

  return (
    <>
      <ul className="space-y-4">
        <SubMenuButton
          href={`/dashboard/${teamKey}/borealis/deals`}
          name="All deals"
          icon={<ListBulletIcon />}
        />
      </ul>

      <MenuDivider />

      <ul className="space-y-4">
        {data.items.map((deal) => (
          <li key={deal.id}>
            <SubMenuButton
              href={`/dashboard/${teamKey}/borealis/deals/${deal.id}`}
              name={deal.name}
              icon={<ClipboardDocumentCheckIcon />}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
