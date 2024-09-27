"use client"

import { ReactNode } from "react"
import Link from "next/link"
import Button from "@/components/v2/Button"

interface AuroraButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  path?: string
  icon?: ReactNode
  onClick?: () => void
}

const AuroraButton = ({ path, ...props }: AuroraButtonProps) => {
  const buttonContent = (
    <Button
      className={`${
        path
          ? "bg-green-400 hover:bg-green-500 text-slate-900"
          : "bg-green-400 text-slate-500 font-normal"
      }`}
      {...props}
    >
      {props.children}
    </Button>
  )

  return path ? <Link href={path}>{buttonContent}</Link> : buttonContent
}

export default AuroraButton
