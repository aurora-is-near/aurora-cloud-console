import { generateSign, getMunzenWidgetUrl } from "./get-munzen-widget"

const MUNZEN_BASE_URL = "https://widget.munzen.io/"
const MUNZEN_API_SECRET = "test-munzen-api-secret"

const munzenUrlParamsMock = {
  toCurrency: "AURORA-AURORA",
  externalData: '{"silo":"aurora"}',
} as const

describe("getMunzenWidgetUrl", () => {
  it("returns a URL with Aurora parameters", async () => {
    const urlResult = await getMunzenWidgetUrl()
    const signatureMock = generateSign(munzenUrlParamsMock, MUNZEN_API_SECRET)

    const urlObject = new URL(urlResult)

    expect(urlObject.href).toContain(MUNZEN_BASE_URL)
    expect(Object.fromEntries(urlObject.searchParams.entries())).toEqual({
      ...munzenUrlParamsMock,
      signature: signatureMock,
      apiKey: "test-munzen-api-key",
    })
  })
})
