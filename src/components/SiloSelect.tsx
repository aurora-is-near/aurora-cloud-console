"use client"

import { useEffect, useState } from "react"
import { useRouter, useSelectedLayoutSegments } from "next/navigation"
import { useTeamKey } from "@/hooks/useTeamKey"
import { Silo } from "@/types/types"

type SiloSelectProps = {
  silos: Silo[]
}

export const SiloSelect = ({ silos }: SiloSelectProps) => {
  const [option, setOption] = useState("")
  const router = useRouter()
  const teamKey = useTeamKey()
  const [, id, subroute] = useSelectedLayoutSegments()

  useEffect(() => {
    setOption(id ?? "Select silo")
  }, [id])

  return (
    <div>
      <label htmlFor="silo" className="sr-only">
        Selected silo
      </label>
      <select
        id="silo"
        name="silo"
        className="block w-full py-4 pl-3 pr-8 leading-none text-gray-900 border-0 rounded-md ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600"
        value={option}
        onChange={(e) =>
          router.push(
            `/dashboard/${teamKey}/silos/${e.target.value}${
              subroute ? `/${subroute}` : "/"
            }`,
          )
        }
      >
        {silos.map((silo) => (
          <option key={silo.id} value={silo.id}>
            {silo.name}
          </option>
        ))}
      </select>
    </div>
  )
}
