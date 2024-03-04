import jestOpenAPI from "jest-openapi"
import { openApiDocument } from "../src/app/api/openapi-document"
import { OpenAPIV3 } from "openapi-types"

export const setupJestOpenApi = () => {
  jestOpenAPI(openApiDocument as OpenAPIV3.Document)
}
