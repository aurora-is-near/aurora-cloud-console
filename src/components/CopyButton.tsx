"use client"

import { useEffect, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { CheckIcon, Square2StackIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

type CopyButtonProps = {
  value: string
  className?: string
  hasBorder?: boolean
  size?: "sm" | "md"
}

const CopyButton = ({ value, className, hasBorder, size }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)
  const iconClassName = size === "sm" ? "w-4 h-4" : "w-5 h-5"
  const containerClassName = clsx(
    "flex-shrink-0 rounded-lg",
    hasBorder && "border border-slate-400",
    size === "sm" ? "p-[7px]" : "p-2",
    className,
  )

  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 1000)

    return () => clearTimeout(timeout)
  }, [copied])

  if (copied) {
    return (
      <div className={clsx(containerClassName, className)}>
        <CheckIcon
          className={clsx("text-green-700 flex-shrink-0", iconClassName)}
        />
      </div>
    )
  }

  return (
    // @ts-expect-error: refs is required according to the CopyToClipboard types
    <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
      <button
        type="button"
        className={clsx(
          "text-slate-900 hover:bg-slate-100",
          containerClassName,
          className,
        )}
      >
        <span className="sr-only">Copy to clipboard</span>
        <Square2StackIcon className={iconClassName} />
      </button>
    </CopyToClipboard>
  )
}

export default CopyButton
