"use client"

import "swagger-ui-react/swagger-ui.css"
import dynamic from "next/dynamic"

const DynamicSwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
})

export default function Page() {
  return <DynamicSwaggerUI url="/api/docs" />
}
