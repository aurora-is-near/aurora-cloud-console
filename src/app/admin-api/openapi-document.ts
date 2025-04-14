import { generateOpenApi } from "@ts-rest/open-api"
import { OpenAPIV3 } from "openapi-types"
import { contract } from "./contract"

const SECURITY_SCHEME = "bearerAuth"

const openApiDocument = generateOpenApi(
  contract,
  {
    info: {
      title: "Aurora Cloud Console Admin API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        [SECURITY_SCHEME]: {
          type: "http",
          scheme: "bearer",
          in: "header",
          name: "Authorization",
          description: "An admin API key",
        },
      },
    },
  },
  {
    setOperationId: true,
  },
)

const isHttpOperation = (
  operation:
    | string
    | OpenAPIV3.ServerObject[]
    | (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[]
    | OpenAPIV3.OperationObject
    | OpenAPIV3.PathItemObject,
): operation is OpenAPIV3.OperationObject =>
  typeof operation === "object" && "operationId" in operation

Object.entries(openApiDocument.paths).forEach(
  ([path, operations]: [string, OpenAPIV3.PathItemObject]) => {
    const tag = path.split("/")[2]

    Object.values(operations).forEach((operation) => {
      if (!isHttpOperation(operation)) {
        return
      }

      // Add a tag for each operation based on the second path segment. For example,
      // endpoints that start with `/api/deals` are tagged with "deals".
      operation.tags = [...(operation.tags ?? []), tag]

      // Add a security scheme for each operation.
      operation.security = [{ [SECURITY_SCHEME]: [] }]
    })
  },
)

export { openApiDocument }
