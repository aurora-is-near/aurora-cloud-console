"use client"

import "swagger-ui-react/swagger-ui.css"
import dynamic from "next/dynamic"

// @ts-ignore
const DynamicSwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
})

const Page = () => {
  return <DynamicSwaggerUI url="/api/docs" />
}

export default Page
