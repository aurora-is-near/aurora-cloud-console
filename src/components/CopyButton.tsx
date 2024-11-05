"use client"

import { useEffect, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { CheckIcon, Square2StackIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/Button"

type CopyButtonProps = {
  value: string
}

const CopyButton = ({ value }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 1000)

    return () => clearTimeout(timeout)
  }, [copied])

  if (copied) {
    return (
      <Button variant="border" disabled>
        <CheckIcon className="text-green-700 flex-shrink-0 w-4 h-4" />
      </Button>
    )
  }

  return (
    <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
      <Button type="button" variant="border">
        <span className="sr-only">Copy to clipboard</span>
        <Square2StackIcon className="w-4 h-4" />
      </Button>
    </CopyToClipboard>
  )
}

export default CopyButton
