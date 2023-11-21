"use client"

import { ReactElement, ReactNode, cloneElement, isValidElement } from "react"
import { useSelectedLayoutSegments } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"

type MenuButtonProps = {
  href: string
  name: string
  icon: ReactNode
  disabled?: boolean
}

const generateIcon = (icon: ReactNode, className: string) => {
  return isValidElement(icon)
    ? cloneElement(icon as ReactElement<any>, {
        className,
        "aria-hidden": true,
      })
    : null
}

const MainMenuButton = ({ href, name, icon }: MenuButtonProps) => {
  const [route] = useSelectedLayoutSegments()
  const current = href.startsWith("/" + route)

  icon = generateIcon(icon, "w-6 h-6 shrink-0")

  return (
    <Link
      href={href}
      className={clsx(
        current
          ? "bg-green-500 text-gray-900"
          : "text-gray-400 hover:text-white hover:bg-gray-800",
        "group flex rounded-lg p-3 text-sm leading-6 font-semibold items-center justify-center",
      )}
    >
      {icon}
      <span className="sr-only">{name}</span>
    </Link>
  )
}

const SubMenuButton = ({ href, name, icon, disabled }: MenuButtonProps) => {
  const [route, subroute, id] = useSelectedLayoutSegments()
  const current =
    href ===
    "/" + route + (subroute ? "/" + subroute : "") + (id ? "/" + id : "")

  icon = generateIcon(
    icon,
    clsx(
      current ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900",
      "w-6 h-6 shrink-0",
    ),
  )

  const commonClasses =
    "w-full flex items-center gap-x-2.5 rounded-lg py-3 px-3.5 text-base leading-4 font-medium"

  if (disabled) {
    return (
      <button
        disabled
        className={clsx(commonClasses, "text-gray-500 opacity-50")}
      >
        {icon}
        <span>{name}</span>
      </button>
    )
  }

  return (
    <Link
      href={href}
      className={clsx(
        current
          ? "bg-gray-100 text-gray-900"
          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100",
        commonClasses,
        "group",
      )}
    >
      {icon}
      <span>{name}</span>
    </Link>
  )
}

const MobileMainMenuButton = ({ href, name, icon }: MenuButtonProps) => {
  const [route] = useSelectedLayoutSegments()
  const current = href.startsWith("/" + route)

  icon = generateIcon(icon, "w-6 h-6 shrink-0")

  return (
    <Link
      href={href}
      className={clsx(
        current
          ? "bg-green-500 text-gray-900"
          : "text-gray-400 hover:text-white hover:bg-gray-800 bg-gray-800",
        "group flex rounded-lg gap-x-3 p-3 text-sm leading-6 font-semibold",
      )}
    >
      {icon}
      <span>{name}</span>
    </Link>
  )
}

const MobileSubMenuButton = ({ href, name, icon }: MenuButtonProps) => {
  const [route, subroute] = useSelectedLayoutSegments()
  const current = href.includes(route + "/" + subroute)

  icon = generateIcon(
    icon,
    clsx(current ? "text-white" : "text-gray-500", "w-5 h-5 shrink-0"),
  )

  return (
    <Link
      href={href}
      className={clsx(
        current ? "bg-gray-800 text-white" : "text-gray-500",
        "group flex items-center gap-x-2.5 rounded-lg py-3 px-3 text-base leading-4 font-semibold",
      )}
    >
      {icon}
      <span>{name}</span>
    </Link>
  )
}

export {
  MainMenuButton,
  SubMenuButton,
  MobileMainMenuButton,
  MobileSubMenuButton,
}
