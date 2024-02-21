"use client"

import { ReactNode } from "react"
import { Tooltip as ReactTooltip } from "react-tooltip"

type TooltipType = "default" | "white"

export type TooltipProps = {
  id: string
  content?: string
  html?: string
  children: ReactNode
  place?: "top" | "right" | "bottom" | "left"
  type?: TooltipType
  className?: string
}

const getStyle = (type?: TooltipType) => {
  if (type === "white") {
    return {
      backgroundColor: "white",
      color: "#1f2937",
    }
  }

  return undefined
}

const getBorder = (type?: TooltipType) => {
  if (type === "white") {
    return "1px solid #6b7280"
  }

  return undefined
}

export const Tooltip = ({
  id,
  content,
  html,
  place,
  children,
  type,
  className,
}: TooltipProps) => (
  <>
    <ReactTooltip
      opacity={1}
      place={place}
      id={id}
      className="z-50"
      style={getStyle(type)}
      border={getBorder(type)}
    />
    <span
      data-tooltip-id={id}
      data-tooltip-content={content}
      data-tooltip-html={html}
      className={className}
    >
      {children}
    </span>
  </>
)
