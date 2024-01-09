"use client"

import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

type DocsProps = {
  spec: Record<string, any>
}

export const Docs = ({ spec }: DocsProps) => {
  return <SwaggerUI spec={spec} />
}
