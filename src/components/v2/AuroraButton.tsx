"use client"

import { ReactNode } from "react"
import Button from "@/components/v2/Button"

interface AuroraButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  path?: string
  icon?: ReactNode
  onClick?: () => void
}

const AuroraButton = ({ path, ...props }: AuroraButtonProps) => {
  return (
    <Button
      className={`${
        path
          ? "bg-green-400 hover:bg-green-500 text-slate-900"
          : "bg-slate-200 text-slate-500 font-normal"
      }`}
      {...props}
    >
      {props.children}
    </Button>
  )
}

export default AuroraButton
