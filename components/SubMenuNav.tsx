"use client"

import SignoutButton from "./SignoutButton"
import { SubMenuButton } from "./MenuButtons"
import { useSelectedLayoutSegments } from "next/navigation"
import { capitalizeFirstLetter } from "@/utils/helpers"
import { SubrouteKeys, subrouteMap } from "@/constants/navigation"

const SubMenuNav = () => {
  const [route] = useSelectedLayoutSegments()
  const heading = capitalizeFirstLetter(route)
  const subroutes = subrouteMap[route as SubrouteKeys] ?? []
  const isSettingsRoute = route === "settings"

  return (
    <>
      <h1 className="font-bold text-2xl leading-7">{heading}</h1>

      <nav className="flex flex-1 flex-col gap-y-4">
        <ul role="list" className="space-y-4">
          {subroutes.map((item) => (
            <li key={item.name}>
              <SubMenuButton {...item} />
            </li>
          ))}
        </ul>

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
