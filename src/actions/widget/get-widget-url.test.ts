import { getWidgetUrl } from "@/actions/widget/get-widget-url"
import { createMockSilo } from "../../../test-utils/factories/silo-factory"
import { createMockWidget } from "../../../test-utils/factories/widget-factory"
import { createMockTokens } from "../../../test-utils/factories/token-factory"

const parseMaybeJson = (str: string) => {
  try {
    return JSON.parse(str)
  } catch {
    return str
  }
}

const searchParamsToJson = (url: URL) => {
  const obj: Record<string, string> = {}

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of url.searchParams) {
    obj[key] = parseMaybeJson(value)
  }

  return obj
}

describe("getWidgetUrl", () => {
  it("returns a widget URL with no query parameters", () => {
    const silo = createMockSilo()
    const widget = createMockWidget()

    const url = new URL(
      getWidgetUrl({
        silo,
        widget,
        tokens: [],
      }),
    )

    expect(url.href).toBe(
      "https://aurora-plus-git-cloud-bridge-auroraisnear.vercel.app/cloud",
    )
  })

  it("returns a widget URL with from and to networks", () => {
    const url = new URL(
      getWidgetUrl({
        silo: createMockSilo(),
        widget: createMockWidget({
          to_networks: ["AURORA"],
          from_networks: ["NEAR", "ETHEREUM"],
        }),
        tokens: createMockTokens(1),
      }),
    )

    expect(searchParamsToJson(url)).toEqual({
      fromNetworks: ["near", "ethereum"],
      toNetworks: ["aurora"],
    })
  })

  it("returns a widget URL with a custom chain", () => {
    const url = new URL(
      getWidgetUrl({
        silo: createMockSilo(),
        widget: createMockWidget({
          to_networks: ["CUSTOM"],
          from_networks: ["ETHEREUM"],
        }),
        tokens: createMockTokens(1),
      }),
    )

    expect(searchParamsToJson(url)).toEqual({
      toNetworks: ["testnet.aurora-silo-dev.near"],
      fromNetworks: ["ethereum"],
      customChains: [
        {
          id: "1313161555",
          name: "Test Silo",
          network: "Test Silo",
          nativeCurrency: {
            decimals: 18,
            name: "Test Silo 1",
            symbol: "TEST",
          },
          rpcUrl: "testnet.aurora.dev",
          auroraEvmAccount: "testnet.aurora-silo-dev.near",
          blockExplorer: {
            name: "Test Silo Explorer",
            url: "https://explorer.testnet.aurora.dev",
          },
        },
      ],
    })
  })
})
