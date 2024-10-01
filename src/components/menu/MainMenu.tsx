import { MenuItem } from "@/types/menu"
import AuroraLogo from "@/components/AuroraLogo"
import { MainMenuButton } from "./MenuButtons"

type MainMenuProps = {
  menuItems: MenuItem[]
}

export const MainMenu = async ({ menuItems }: MainMenuProps) => {
  return (
    <div className="flex flex-row justify-between w-full bg-slate-900 px-4 py-4">
      <AuroraLogo />
      <ul className="flex flex-row divide-x divide-slate-700 items-center">
        {menuItems.map((item) => (
          <li key={item.name} className="px-2">
            <MainMenuButton {...item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
