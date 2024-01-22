import { NextResponse } from "next/server"
import { contract } from "../contract"
import { generateOpenApi } from "@ts-rest/open-api"
import { PathItemObject, OperationObject } from "openapi3-ts/oas31"

const SECURITY_SCHEME = "bearerAuth"

const openApiDocument = generateOpenApi(
  contract,
  {
    info: {
      title: "Aurora Cloud Console API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        [SECURITY_SCHEME]: {
          type: "http",
          scheme: "bearer",
          in: "header",
          name: "Authorization",
          description: "An API key generated via the Aurora Cloud Console",
        },
      },
    },
  },
  {
    setOperationId: true,
  },
)

Object.entries(openApiDocument.paths).forEach(
  ([path, operations]: [string, PathItemObject]) => {
    const tag = path.split("/")[2]

    Object.values(operations).forEach((operation: OperationObject) => {
      const { metadata } =
        Object.entries(contract).find(
          ([key]) => key === operation.operationId,
        )?.[1] ?? {}

      // Add a tag for each operation based on the second path segment. For example,
      // endpoints that start with `/api/deals` are tagged with "deals".
      operation.tags = [...(operation.tags ?? []), tag]

      // Add a security scheme for each operation, using the scopes defined in
      // the metadata.
      operation.security = [{ [SECURITY_SCHEME]: metadata?.scopes ?? [] }]

      // Append the required scopes to the operation description.
      if (metadata?.scopes.length) {
        operation.description = `**Required scopes:** ${metadata.scopes
          .map((scope) => `\`${scope}\``)
          .join(" ")}`
      }
    })
  },
)

export const GET = () => {
  return NextResponse.json(openApiDocument)
}
