import { getMunzenWidgetUrl } from "./get-munzen-widget"

const MUNZEN_BASE_URL = "https://widget.munzen.io/"

const munzenUrlParamsMock = {
  toCurrency: "AURORA-AURORA",
  externalData: '{"silo":"aurora"}',
} as const

describe("getMunzenWidgetUrl", () => {
  it("returns a URL with Aurora parameters", async () => {
    const urlResult = await getMunzenWidgetUrl()

    const urlObject = new URL(urlResult)

    expect(urlObject.href).toContain(MUNZEN_BASE_URL)
    expect(Object.fromEntries(urlObject.searchParams.entries())).toEqual(
      expect.objectContaining({
        ...munzenUrlParamsMock,
        apiKey: "test-munzen-api-key",
        signature: expect.any(String),
      }),
    )
  })
})
