"use client"

import { MobileSubMenuButton } from "@/components/menu/MenuButtons"
import { useLists } from "@/hooks/useLists"
import { Modals } from "@/utils/modals"
import {
  ClipboardDocumentCheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"
import { useSelectedLayoutSegments } from "next/navigation"

export const MobileListsMenu = () => {
  const { data } = useLists()
  const [, , teamKey] = useSelectedLayoutSegments()

  return (
    <ul className="space-y-2">
      {data?.items.map((list) => (
        <li key={list.id}>
          <MobileSubMenuButton
            href={`/dashboard/${teamKey}/lists/${list.id}`}
            name={list.name}
            icon={<ClipboardDocumentCheckIcon />}
          />
        </li>
      ))}
      <li>
        <MobileSubMenuButton
          href={`/dashboard/${teamKey}/lists?modal=${Modals.AddList}`}
          name="New list"
          icon={<PlusIcon />}
        />
      </li>
    </ul>
  )
}
