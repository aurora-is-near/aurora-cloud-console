import { getWidgetUrl } from "@/actions/widget/get-widget-url"
import { createMockSilo } from "../../../test-utils/factories/silo-factory"
import { createMockWidget } from "../../../test-utils/factories/widget-factory"
import {
  createMockSiloBridgedToken,
  createMockSiloBridgedTokens,
} from "../../../test-utils/factories/silo-bridged-token-factory"

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
  it("returns a URL with no query parameters", () => {
    const silo = createMockSilo()
    const widget = createMockWidget()

    const url = new URL(
      getWidgetUrl({
        silo,
        widget,
        tokens: [],
      }),
    )

    expect(url.href.split("?")[0]).toBe("https://aurora.plus/cloud")
    expect(searchParamsToJson(url)).toEqual({
      fromNetworks: [],
      toNetworks: [],
    })
  })

  it("returns a URL with from and to networks", () => {
    const url = new URL(
      getWidgetUrl({
        silo: createMockSilo(),
        widget: createMockWidget({
          to_networks: ["AURORA"],
          from_networks: ["NEAR", "ETHEREUM"],
        }),
        tokens: createMockSiloBridgedTokens(1),
      }),
    )

    expect(searchParamsToJson(url)).toEqual({
      fromNetworks: ["near", "ethereum"],
      toNetworks: ["aurora"],
    })
  })

  it("returns a URL with a custom chain", () => {
    const silo = createMockSilo()
    const url = new URL(
      getWidgetUrl({
        silo,
        widget: createMockWidget({
          to_networks: ["CUSTOM"],
          from_networks: ["ETHEREUM"],
        }),
        tokens: createMockSiloBridgedTokens(1),
      }),
    )

    expect(searchParamsToJson(url)).toEqual({
      toNetworks: ["testnet.aurora-silo-dev.near"],
      fromNetworks: ["ethereum"],
      customChains: [
        {
          id: 1313161555,
          name: "Test Silo",
          network: "Test Silo",
          nativeCurrency: {
            decimals: 18,
            name: silo.base_token_name,
            symbol: silo.base_token_symbol,
          },
          rpcUrl: "testnet.aurora.dev",
          auroraEvmAccount: "testnet.aurora-silo-dev.near",
          blockExplorer: {
            name: "Test Silo Explorer",
            url: "https://explorer.testnet.aurora.dev",
          },
          logo: "https://example.com/favicon.png",
          siloToSiloBridge: silo.silo_to_silo_bridge_address,
        },
      ],
    })
  })

  it("returns a URL with a custom chain and custom tokens", () => {
    const silo = createMockSilo()
    const token = createMockSiloBridgedToken({
      symbol: "ETH",
      aurora_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      ethereum_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      near_address: "aurora",
    })

    const url = new URL(
      getWidgetUrl({
        silo,
        widget: createMockWidget({
          to_networks: ["CUSTOM"],
          from_networks: ["ETHEREUM"],
          tokens: [token.id],
        }),
        tokens: [token],
      }),
    )

    expect(searchParamsToJson(url)).toEqual({
      toNetworks: ["testnet.aurora-silo-dev.near"],
      fromNetworks: ["ethereum"],
      customChains: [
        {
          id: 1313161555,
          name: "Test Silo",
          network: "Test Silo",
          nativeCurrency: {
            decimals: 18,
            name: silo.base_token_name,
            symbol: silo.base_token_symbol,
          },
          rpcUrl: "testnet.aurora.dev",
          auroraEvmAccount: "testnet.aurora-silo-dev.near",
          blockExplorer: {
            name: "Test Silo Explorer",
            url: "https://explorer.testnet.aurora.dev",
          },
          logo: "https://example.com/favicon.png",
          siloToSiloBridge: silo.silo_to_silo_bridge_address,
        },
      ],
      customTokens: [
        {
          [silo.engine_account]: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          aurora: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          decimals: 18,
          ethereum: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          icon: "http://example.com/path/to/icon.png",
          name: "Test Token",
          near: "aurora",
          symbol: "ETH",
        },
      ],
    })
  })

  it("returns a url using a custom token that only has an aurora address", () => {
    const silo = createMockSilo()
    const token = createMockSiloBridgedToken({
      symbol: "MYTOKEN",
      aurora_address: "0x1234567890",
      ethereum_address: null,
      near_address: "test.near",
      silo_address: null,
    })

    const url = new URL(
      getWidgetUrl({
        silo,
        widget: createMockWidget({
          to_networks: ["CUSTOM"],
          from_networks: ["AURORA"],
          tokens: [token.id],
        }),
        tokens: [token],
      }),
    )

    expect(searchParamsToJson(url).customTokens).toEqual([
      {
        aurora: "0x1234567890",
        near: "test.near",
        decimals: 18,
        icon: "http://example.com/path/to/icon.png",
        name: "Test Token",
        symbol: "MYTOKEN",
      },
    ])
  })

  it("returns a url using multiple custom tokens", () => {
    const silo = createMockSilo()
    const tokenA = createMockSiloBridgedToken({
      symbol: "TOKENA",
      aurora_address: "0x123",
      silo_address: "0x456",
      ethereum_address: null,
      near_address: "test.near",
    })

    const tokenB = createMockSiloBridgedToken({
      symbol: "TOKENB",
      aurora_address: "0x456",
      ethereum_address: null,
      near_address: "test.near2",
      silo_address: null,
    })

    const url = new URL(
      getWidgetUrl({
        silo,
        widget: createMockWidget({
          to_networks: ["CUSTOM"],
          from_networks: ["AURORA"],
          tokens: [tokenA.id, tokenB.id],
        }),
        tokens: [tokenA, tokenB],
      }),
    )

    expect(searchParamsToJson(url).customTokens).toEqual([
      {
        [silo.engine_account]: "0x456",
        aurora: "0x123",
        near: "test.near",
        decimals: 18,
        icon: "http://example.com/path/to/icon.png",
        name: "Test Token",
        symbol: "TOKENA",
      },
      {
        aurora: "0x456",
        near: "test.near2",
        decimals: 18,
        icon: "http://example.com/path/to/icon.png",
        name: "Test Token",
        symbol: "TOKENB",
      },
    ])
  })

  it("returns a url where one of the bridged tokens is the base token", () => {
    const symbol = "BASE"
    const silo = createMockSilo({ base_token_symbol: symbol })
    const tokenA = createMockSiloBridgedToken({
      symbol,
      ethereum_address: "0x123",
      near_address: "near.base",
      aurora_address: null,
    })

    const url = new URL(
      getWidgetUrl({
        silo,
        widget: createMockWidget({
          to_networks: ["CUSTOM"],
          from_networks: ["AURORA"],
          tokens: [tokenA.id],
        }),
        tokens: [tokenA],
      }),
    )

    expect(searchParamsToJson(url).customTokens).toEqual([
      {
        [silo.engine_account]: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        ethereum: "0x123",
        near: "near.base",
        decimals: 18,
        icon: "http://example.com/path/to/icon.png",
        name: "Test Token",
        symbol: "BASE",
      },
    ])
  })
})
