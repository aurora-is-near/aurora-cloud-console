import { WidgetName } from "@/types/widgets"

const getOrigin = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return "https://app.auroracloud.dev"
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  return "http://localhost:3000"
}

export const isTeamWidgetUrl = (teamKey: string, url: string | URL) => {
  const expectedOrigin = getOrigin()
  const { pathname, origin } = new URL(url, expectedOrigin)

  if (!origin.startsWith(expectedOrigin)) {
    return false
  }

  return new RegExp(`^/dashboard/${teamKey}/silos/\\d+/widgets/.*`).test(
    pathname,
  )
}

export const getWidgetUrl = (
  teamKey: string,
  siloId: number,
  widgetName: WidgetName,
  {
    isShareableUrl = false,
  }: {
    isShareableUrl?: boolean
  } = {},
) => {
  return new URL(
    `/dashboard/${teamKey}/silos/${siloId}/widgets/${widgetName}${isShareableUrl ? "" : ".js"}`,
    getOrigin(),
  ).href
}
