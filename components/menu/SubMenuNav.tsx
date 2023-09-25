"use client"

import SignoutButton from "./SignoutButton"
import { SubMenuButton } from "./MenuButtons"
import { useSelectedLayoutSegments } from "next/navigation"
import { capitalizeFirstLetter } from "@/utils/helpers"
import { SubrouteKeys, subrouteMap } from "@/constants/navigation"
import Heading from "../Heading"
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline"
import useDeals from "@/hooks/useDeals"

const SubMenuNav = () => {
  const [route] = useSelectedLayoutSegments()
  const heading = capitalizeFirstLetter(route)
  const subroutes = subrouteMap[route as SubrouteKeys] ?? []
  const isSettingsRoute = route === "settings"
  const deals = useDeals()

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

        <div className="h-px bg-gray-200 w-full" />

        {route === "borealis" && deals.length > 0 ? (
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
