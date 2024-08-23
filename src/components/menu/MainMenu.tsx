import Link from "next/link"
import { MenuItem } from "@/types/menu"
import { MainMenuButton } from "./MenuButtons"

type MainMenuProps = {
  mainMenuItems: MenuItem[]
  extraMenuItems: MenuItem[]
}

export const MainMenu = async ({
  // mainMenuItems,
  extraMenuItems,
}: MainMenuProps) => {
  return (
    <div className="hidden lg:relative lg:inset-x-0 lg:top-0 lg:z-50 lg:flex lg:flex-row lg:items-center lg:bg-gray-900 lg:px-4 lg:py-4 lg:gap-x-8">
      <Link href="/" className="flex h-15 shrink-0 items-center justify-center">
        <div
          className="mr-2 pr-2 py-0.5"
          style={{ borderRight: "1px solid #64748B" }}
        >
          <img
            src="/static/v2/images/Aurora.svg"
            alt="Aurora"
            className="lg:w-100 lg:h-15"
          />
        </div>
        <img
          src="/static/v2/images/AuroraCloud.svg"
          alt="AuroraCloud"
          className="lg:w-84 lg:h-26"
        />
      </Link>

      <nav className="flex-1 flex-row flex gap-x-4">
        {/* <ul className="flex flex-row items-center gap-x-4"> */}
        {/*   {mainMenuItems.map((item) => ( */}
        {/*     <li key={item.name}> */}
        {/*       <MainMenuButton {...item} /> */}
        {/*     </li> */}
        {/*   ))} */}
        {/* </ul> */}

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
