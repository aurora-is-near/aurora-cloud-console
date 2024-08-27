"use client"

import React, { ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  title?: string
  path?: string
  bordered?: boolean
  icon?: ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  title,
  children,
  path,
  icon,
  onClick,
  bordered,
  ...props
}) => {
  const { className } = props
  const pathname = usePathname()
  const router = useRouter()
  const active = path === pathname

  const overriddenClassName = `
    group rounded-lg text-md font-semibold flex flex-row items-center gap-2 p-2 pr-5 hover:bg-slate-100 
    ${className} ${active && "bg-slate-100 text-slate-900"}
  `

  const filteredProps = { ...props }

  filteredProps.className = ""

  const borderedIconStyles = `rounded-lg ${
    active ? "bg-slate-900" : "bg-slate-200"
  }`

  const activeIconStyles =
    active && bordered ? "text-slate-50 bg-slate-900" : ""

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (path) {
      router.push(path)
    }
  }

  return (
    <button
      {...filteredProps}
      className={overriddenClassName}
      onClick={handleClick}
      type="button"
      title={title}
    >
      <div
        className={`
          w-[30px] h-[30px] flex items-center justify-center
          ${activeIconStyles} 
          ${bordered && borderedIconStyles}
        `}
      >
        {icon && icon}
      </div>
      {children ?? title}
    </button>
  )
}

export default Button
