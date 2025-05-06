"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"

type MarketPlaceSearchInputProps = {
  className?: string
}

export const MarketPlaceSearchInput = ({
  className,
}: MarketPlaceSearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [hasText, setHasText] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = inputRef.current?.value.trim()

    if (value) {
      router.push(`/marketplace/search?query=${encodeURIComponent(value)}`)
    }
  }

  const handleChange = () => {
    setHasText(!!inputRef.current?.value.trim())
  }

  return (
    <form
      onSubmit={onSubmit}
      className={clsx(
        "flex items-center justify-center w-full max-w-[270px] bg-slate-800 rounded-lg text-slate-300 overflow-hidden px-2.5 group focus-within:bg-slate-700",
        className,
      )}
    >
      <MagnifyingGlassIcon className="w-5 h-5 mr-2.5" />
      <input
        required
        ref={inputRef}
        type="text"
        placeholder="Search apps"
        className="w-full bg-transparent border-none p-0 py-2 text-slate-50 focus:outline-none focus:ring-0 placeholder:text-slate-300"
        onChange={handleChange}
      />
      {hasText && (
        <Image src="/static/icons/return.svg" alt="" width={16} height={16} />
      )}
    </form>
  )
}
