const { mockSupabaseClient } = require("./test-utils/mock-supabase-client")

jest.mock(
  "next/link",
  () => (props) => jest.requireActual("react").createElement("a", props),
)

jest.mock("next/headers", () => {
  return {
    headers: jest.fn(() => ({
      get: jest.fn(),
    })),
    cookies: jest.fn(() => ({
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    })),
  }
})

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
    pathname: "/mock-path",
    route: "/mock-path",
    query: { key: "value" },
    asPath: "/mock-path?key=value",
    isFallback: false,
  }),
}))

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => mockSupabaseClient),
}))

jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(() => mockSupabaseClient),
}))

jest.mock("pg", () => ({
  Pool: jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(() => ({
      rows: [],
    })),
    end: jest.fn(),
  })),
}))

jest.mock("cryptr", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    encrypt: jest.fn(() => "encrypted-text"),
    decrypt: jest.fn(() => "decrypted-text"),
  })),
}))

jest.mock("lottie-react", () => jest.fn())

jest.mock("stripe", () =>
  jest.fn(() => ({
    products: {
      retrieve: jest.fn(() => ({
        id: "test_product_id",
        default_price: "test_price_id",
        number_of_transactions: 15000,
      })),
    },
    prices: {
      retrieve: jest.fn(() => ({ id: "test_price_id" })),
    },
    checkout: {
      sessions: {
        create: jest.fn(() => ({
          url: "https://payment.link/session",
        })),
      },
    },
  })),
)
