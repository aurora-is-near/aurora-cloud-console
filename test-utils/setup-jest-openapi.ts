import jestOpenAPI from "jest-openapi"
import { generateOpenApiDocument } from "../src/app/api/openapi-document"
import { OpenAPIV3 } from "openapi-types"

export const setupJestOpenApi = () => {
  jestOpenAPI(generateOpenApiDocument("test") as OpenAPIV3.Document)
}
