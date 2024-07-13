import jestOpenAPI from "jest-openapi"
import { OpenAPIV3 } from "openapi-types"
import { openApiDocument } from "../src/app/api/openapi-document"

export const setupJestOpenApi = () => {
  jestOpenAPI(openApiDocument as OpenAPIV3.Document)
}
