import { NextRequest } from "next/server"
import { getSilo } from "@/actions/silos/get-silo"
import { getForwarderWidgetUrl } from "@/utils/forwarder"

export const buildForwarderWidgetUrl = async (req: NextRequest) => {
  const siloId = Number(req.nextUrl.pathname.match(/\/silos\/(\d+)/)?.[1])

  if (Number.isNaN(siloId)) {
    return null
  }

  const silo = await getSilo(siloId)

  if (!silo) {
    return null
  }

  return getForwarderWidgetUrl(silo)
}
