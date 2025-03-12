"use client"

import { ReactNode, useEffect, useState } from "react"
import Link from "next/link"
import clsx from "clsx"
import { generateIcon } from "@/utils/buttons"

type MainMenuButtonProps = {
  name: string
  icon?: ReactNode
  className?: string
  getNotificationCount?: () => number | Promise<number>
} & (
  | {
      href?: never
      isExternal?: never
      onClick: () => void
    }
  | {
      href: string
      onClick?: never
      isExternal?: boolean
    }
)

export const MainMenuButton = ({
  name,
  icon,
  className,
  href,
  isExternal,
  onClick,
  getNotificationCount,
}: MainMenuButtonProps) => {
  const [notificationCount, setNotificationCount] = useState<number | null>(
    null,
  )

  icon = generateIcon(icon, "w-5 h-5 shrink-0")

  const containerClassName = clsx(
    "relative",
    "text-slate-300 hover:text-slate-50 hover:bg-slate-700",
    "group flex rounded-lg p-2 text-sm leading-6 font-semibold items-center justify-center",
    className,
  )

  const notificationCountBadge = notificationCount ? (
    <span className="bg-red-500 text-white text-xs rounded-full px-1 absolute top-0 right-0 w-4 h-4 flex items-center justify-center">
      {notificationCount}
    </span>
  ) : null

  const content = (
    <>
      {icon}
      <span className="sr-only">{name}</span>
      {notificationCountBadge}
    </>
  )

  useEffect(() => {
    if (!getNotificationCount) {
      return
    }

    void (async () => {
      setNotificationCount(await getNotificationCount())
    })()
  }, [getNotificationCount])

  if (href) {
    return (
      <Link
        href={href}
        className={containerClassName}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={containerClassName} onClick={onClick}>
      {content}
    </button>
  )
}
