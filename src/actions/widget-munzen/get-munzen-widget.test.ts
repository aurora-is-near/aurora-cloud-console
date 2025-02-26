import { createMockSilo } from "../../../test-utils/factories/silo-factory"
import { getMunzenWidgetUrl } from "./get-munzen-widget"

const MUNZEN_BASE_URL = "https://widget.munzen.io/"

describe("getMunzenWidgetUrl", () => {
  it("returns a URL with Aurora parameters", async () => {
    const silo = createMockSilo({ chain_id: 1313161554 })
    const urlResult = await getMunzenWidgetUrl(silo)

    const urlObject = new URL(urlResult)

    expect(urlObject.href).toContain(MUNZEN_BASE_URL)
    expect(Object.fromEntries(urlObject.searchParams.entries())).toEqual({
      toCurrency: "USDT-AURORA",
      externalData: '{"silo":"aurora"}',
      apiKey: "test-munzen-api-key",
      signature: expect.any(String),
    })
  })

  it("returns a URL for a custom chain", async () => {
    const engineAccount = "0x4e45415c.c.aurora"
    const silo = createMockSilo({ engine_account: engineAccount })
    const urlResult = await getMunzenWidgetUrl(silo)

    const urlObject = new URL(urlResult)

    expect(urlObject.href).toContain(MUNZEN_BASE_URL)
    expect(Object.fromEntries(urlObject.searchParams.entries())).toEqual({
      toCurrency: "USDT-AURORA",
      externalData: `{"silo":"${engineAccount}"}`,
      apiKey: "test-munzen-api-key",
      signature: expect.any(String),
    })
  })
})
