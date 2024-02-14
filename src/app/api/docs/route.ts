import { NextResponse } from "next/server"
import { openApiDocument } from "../openapi-document"

export const GET = () => {
  return NextResponse.json(openApiDocument)
}
