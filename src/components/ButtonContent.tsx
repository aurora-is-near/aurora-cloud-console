"use client"

import { ReactNode } from "react"
import clsx from "clsx"
import { Spinner } from "@/components/Spinner"

type ButtonContentProps = {
  isLoading?: boolean
  children: ReactNode
}

export const ButtonContent = ({ isLoading, children }: ButtonContentProps) => (
  <>
    <span
      className={clsx("flex items-center justify-center gap-2", {
        "opacity-0": isLoading,
      })}
    >
      {children}
    </span>
    {isLoading && <Spinner />}
  </>
)
