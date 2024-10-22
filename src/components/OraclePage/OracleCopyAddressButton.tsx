"use client"

import { CheckIcon, Square2StackIcon } from "@heroicons/react/20/solid"
import CopyToClipboard from "react-copy-to-clipboard"
import toast from "react-hot-toast"
import { useRef, useState } from "react"
import { Button } from "@/components/Button"

type OracleDeploymentTabProps = {
  address: string
}

export const OracleCopyAddressButton = ({
  address,
}: OracleDeploymentTabProps) => {
  const timer = useRef<number>()
  const [wasCopied, setWasCopied] = useState(false)

  const onCopy = () => {
    clearTimeout(timer.current)
    setWasCopied(true)
    toast.success("Address copied to clipboard")

    timer.current = window.setTimeout(() => {
      setWasCopied(false)
      toast.dismiss()
    }, 2000)
  }

  const Icon = wasCopied ? CheckIcon : Square2StackIcon

  return (
    <CopyToClipboard text={address} onCopy={onCopy}>
      <Button>
        <Icon className="w-4 h-4" />
        Copy
      </Button>
    </CopyToClipboard>
  )
}
