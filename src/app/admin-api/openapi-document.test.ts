import { openApiDocument } from "./openapi-document"

describe("OpenAPI Document", () => {
  it("should be valid", async () => {
    expect(openApiDocument).toMatchSnapshot()
  })
})
