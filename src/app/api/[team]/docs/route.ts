import { NextResponse } from "next/server"
import { generateOpenApiDocument } from "../../openapi-document"

import { NextApiRequest } from "next"
import { getTeamKeyFromRequest } from "@/utils/current-team"

export const GET = (req: NextApiRequest) => {
  console.log(req)
  const teamKey = getTeamKeyFromRequest(req)
  const openApiDocument = generateOpenApiDocument(teamKey)

  return NextResponse.json(openApiDocument)
}
