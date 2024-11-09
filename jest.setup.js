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
