"use client"

import { useSelectedLayoutSegments } from "next/navigation"
import { SubMenuButton } from "./MenuButtons"
import { capitalizeFirstLetter } from "@/utils/helpers"
import SignoutButton from "./SignoutButton"
import { SubrouteKeys, subrouteMap } from "@/constants/navigation"

const SubMenu = () => {
  const [route] = useSelectedLayoutSegments()
  const heading = capitalizeFirstLetter(route)
  const subroutes = subrouteMap[route as SubrouteKeys] ?? []
  const isSettingsRoute = route === "settings"

  return (
    <aside className="bg-white fixed inset-y-0 left-20 hidden w-72 overflow-y-auto border-r border-gray-200 p-6 pt-[26px] lg:flex grow flex-col gap-y-[26px]">
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
    </aside>
  )
}

export default SubMenu
