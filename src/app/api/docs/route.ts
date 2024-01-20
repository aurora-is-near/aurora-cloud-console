import { NextResponse } from "next/server"
import { contract } from "../../../api-contract"
import { generateOpenApi } from "@ts-rest/open-api"

const openApiDocument = generateOpenApi(
  contract,
  {
    info: {
      title: "Aurora Cloud Console API",
      version: "1.0.0",
    },
  },
  {
    setOperationId: true,
  },
)

export const GET = () => {
  return NextResponse.json(openApiDocument)
}
