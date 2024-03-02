import { AuroraTriangle } from "@/components/icons"
import { MenuItem } from "@/types/menu"
import { MainMenuButton } from "./MenuButtons"
import Link from "next/link"

type MainMenuProps = {
  mainMenuItems: MenuItem[]
  extraMenuItems: MenuItem[]
}

export default async function MainMenu({
  mainMenuItems,
  extraMenuItems,
}: MainMenuProps) {
  return (
    <div className="hidden lg:relative lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:flex-col lg:items-center lg:px-2 lg:bg-gray-900 lg:py-4 lg:gap-y-4">
      <Link
        href="/"
        className="flex h-12 w-12 shrink-0 items-center justify-center"
      >
        <AuroraTriangle className="w-6 h-6" />
      </Link>

      <nav className="flex-1 flex-col flex gap-y-4">
        <ul role="list" className="flex flex-col items-center gap-y-4">
          {mainMenuItems.map((item) => (
            <li key={item.name}>
              <MainMenuButton {...item} />
            </li>
          ))}
        </ul>

        <ul role="list" className="mt-auto flex flex-col items-center gap-y-4">
          {extraMenuItems.map((item) => (
            <li key={item.name}>
              <MainMenuButton {...item} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
