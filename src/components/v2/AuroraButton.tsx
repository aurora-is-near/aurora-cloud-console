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

const AuroraButton = ({ ...props }: AuroraButtonProps) => {
  return (
    <Button className="bg-green-400 hover:bg-green-300" {...props}>
      {props.children}
    </Button>
  )
}

export default AuroraButton
