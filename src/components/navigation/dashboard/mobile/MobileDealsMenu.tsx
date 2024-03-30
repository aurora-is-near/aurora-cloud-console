"use client"

import { MobileSubMenuButton } from "@/components/menu/MenuButtons"
import { useDeals } from "@/hooks/useDeals"
import { useTeamKey } from "@/hooks/useTeamKey"
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline"

export const MobileDealsMenu = () => {
  const { data } = useDeals()
  const teamKey = useTeamKey()

  return (
    <ul className="space-y-2">
      {data?.items.map((deal) => (
        <li key={deal.id}>
          <MobileSubMenuButton
            href={`/dashboard/${teamKey}/borealis/deals/${deal.id}`}
            name={deal.name}
            icon={<ClipboardDocumentCheckIcon />}
          />
        </li>
      ))}
    </ul>
  )
}
