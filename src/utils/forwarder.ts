import { Silo } from "@/types/types"

export const getForwarderWidgetUrl = (silo: Silo) => {
  const widgetUrl = new URL(
    "https://aurora-plus-git-forwarder-widget-auroraisnear.vercel.app/forwarder-widget",
  )

  widgetUrl.searchParams.append("customSiloName", silo.name)
  widgetUrl.searchParams.append("customSiloId", silo.engine_account)

  if (silo.explorer_url) {
    widgetUrl.searchParams.append(
      "customSiloExplorer",
      silo.explorer_url.split("://")[1].split("/")[0],
    )
  }

  return widgetUrl.href
}
