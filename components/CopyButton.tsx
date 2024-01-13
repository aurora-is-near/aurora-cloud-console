"use client"

import { useEffect, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { CheckIcon, Square2StackIcon } from "@heroicons/react/24/outline"

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 1000)
    return () => clearTimeout(timeout)
  }, [copied])

  return copied ? (
    <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-700" />
  ) : (
    <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
      <button
        type="button"
        className="text-gray-500 hover:text-gray-900 flex-shrink-0"
      >
        <span className="sr-only">Copy to clipboard</span>
        <Square2StackIcon className="w-5 h-5" />
      </button>
    </CopyToClipboard>
  )
}

export default CopyButton
