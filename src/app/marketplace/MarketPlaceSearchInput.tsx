"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"
import { FormEvent, useRef } from "react"

export const MarketPlaceSearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = inputRef.current?.value.trim()

    if (value) {
      router.push(`/marketplace/search?query=${encodeURIComponent(value)}`)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center justify-center w-full max-w-[270px] bg-slate-800 rounded-lg text-slate-300 overflow-hidden px-2.5"
    >
      <MagnifyingGlassIcon className="w-5 h-5 mr-2.5" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search apps"
        className="w-full bg-transparent border-none p-0 py-2 focus:outline-none focus:ring-0 placeholder:text-slate-300 focus:placeholder:text-slate-500"
      />
    </form>
  )
}
