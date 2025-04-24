import { WidgetName } from "@/types/widgets"
import { getSiteOrigin } from "@/utils/origin"

export const isTeamWidgetUrl = (teamKey: string, url: string | URL) => {
  const expectedOrigin = getSiteOrigin()
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
    getSiteOrigin(),
  ).href
}
