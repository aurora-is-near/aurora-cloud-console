"use client"

import "swagger-ui-react/swagger-ui.css"
import dynamic from "next/dynamic"
import { useTeamKey } from "@/hooks/useTeamKey"

const DynamicSwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
})

export default function Page() {
  const teamKey = useTeamKey()

  return <DynamicSwaggerUI url={`/api/${teamKey}/docs`} />
}
