import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { MenuItem } from "@/types/menu"
import AuroraLogo from "@/components/AuroraLogo"
import { MainMenuButton } from "@/components/menu/MainMenuButton"
import { MobileMenuToggleButton } from "@/components/menu/MobileMenuToggleButton"

type MainMenuProps = {
  menuItems: MenuItem[]
}

export const MainMenu = async ({ menuItems }: MainMenuProps) => {
  return (
    <div className="flex flex-row justify-between w-full bg-slate-900 px-4 py-4">
      <AuroraLogo />
      <ul className="hidden lg:flex flex-row items-center">
        {menuItems.map((item) => (
          <li key={item.name} className="px-2">
            <MainMenuButton {...item} />
          </li>
        ))}
        <li
          className={clsx(
            "pl-2",
            menuItems.length && "border-l border-slate-700",
          )}
        >
          <MainMenuButton
            name="Logout"
            href="/logout"
            icon={<ArrowRightOnRectangleIcon />}
          />
        </li>
      </ul>
      <MobileMenuToggleButton />
    </div>
  )
}
