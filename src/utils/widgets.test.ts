import { getWidgetUrl, isTeamWidgetUrl } from "@/utils/widgets"

describe("Widget utils", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = "production"
    delete process.env.NEXT_PUBLIC_VERCEL_URL
  })

  describe("getWidgetUrl", () => {
    it("generates the expected widget URL", () => {
      expect(getWidgetUrl("team-key", 123, "bridge")).toBe(
        "https://app.auroracloud.dev/dashboard/team-key/silos/123/widgets/bridge.js",
      )
    })

    it("generates the expected widget URL in a Vercel preview environment", () => {
      process.env.NEXT_PUBLIC_VERCEL_ENV = "preview"
      process.env.NEXT_PUBLIC_VERCEL_URL = "example.vercel.app"

      expect(getWidgetUrl("team-key", 123, "bridge")).toBe(
        "https://example.vercel.app/dashboard/team-key/silos/123/widgets/bridge.js",
      )
    })

    it("generates the expected widget URL in a non-Vercel environment", () => {
      delete process.env.NEXT_PUBLIC_VERCEL_ENV
      delete process.env.NEXT_PUBLIC_VERCEL_URL

      expect(getWidgetUrl("team-key", 123, "bridge")).toBe(
        "http://localhost:3000/dashboard/team-key/silos/123/widgets/bridge.js",
      )
    })
  })

  describe("isTeamWidgetUrl", () => {
    it("returns true for an absolute widget URL", () => {
      expect(
        isTeamWidgetUrl(
          "team-key",
          "https://app.auroracloud.dev/dashboard/team-key/silos/123/widgets/bridge.js",
        ),
      ).toBe(true)
    })

    it("returns true for a relative widget URL", () => {
      expect(
        isTeamWidgetUrl(
          "team-key",
          "/dashboard/team-key/silos/123/widgets/bridge.js",
        ),
      ).toBe(true)
    })

    it("returns false for an invalid pathname", () => {
      expect(isTeamWidgetUrl("team-key", "/wrong")).toBe(false)
    })

    it("returns false for an invalid origin", () => {
      expect(
        isTeamWidgetUrl(
          "team-key",
          "https://wrong.com/dashboard/team-key/silos/123/widgets/bridge.js",
        ),
      ).toBe(false)
    })

    it("returns true for a widget URL generated via getWidgetUrl", () => {
      const teamKey = "team-key"
      const widgetUrl = getWidgetUrl(teamKey, 123, "bridge")

      expect(isTeamWidgetUrl(teamKey, widgetUrl)).toBe(true)
    })
  })
})
