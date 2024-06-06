"use client"

import {
  ClipboardDocumentCheckIcon,
  ListBulletIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"
import { useLists } from "@/hooks/useLists"
import { Modals } from "@/utils/modals"
import { MenuItemsLoader } from "@/components/menu/MenuItemsLoader"
import { SubMenuButton } from "@/components/menu/MenuButtons"
import { MenuDivider } from "@/components/menu/MenuDivider"
import { useTeamKey } from "@/hooks/useTeamKey"

export const ListsMenu = () => {
  const teamKey = useTeamKey()
  const { data, isLoading } = useLists()

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
          href={`/dashboard/${teamKey}/lists`}
          name="All lists"
          icon={<ListBulletIcon />}
        />
      </ul>

      <MenuDivider />

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
    </>
  )
}
