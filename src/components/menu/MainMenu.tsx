import Link from "next/link"
import { AuroraTriangle } from "@/components/icons"
import { MenuItem } from "@/types/menu"
import { MainMenuButton } from "./MenuButtons"

type MainMenuProps = {
  mainMenuItems: MenuItem[]
  extraMenuItems: MenuItem[]
}

export const MainMenu = async ({
  mainMenuItems,
  extraMenuItems,
}: MainMenuProps) => {
  return (
    <div className="hidden lg:relative lg:inset-x-0 lg:top-0 lg:z-50 lg:flex lg:flex-row lg:items-center lg:px-2 lg:bg-gray-900 lg:px-4 lg:py-4 lg:gap-x-8">
      <Link
        href="/"
        className="flex h-12 w-12 shrink-0 items-center justify-center"
      >
        <AuroraTriangle className="w-6 h-6" />
      </Link>

      <nav className="flex-1 flex-row flex gap-x-4">
        <ul className="flex flex-row items-center gap-x-4">
          {mainMenuItems.map((item) => (
            <li key={item.name}>
              <MainMenuButton {...item} />
            </li>
          ))}
        </ul>

        <ul className="ml-auto flex flex-row items-center gap-x-4">
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
