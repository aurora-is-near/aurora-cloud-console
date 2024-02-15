import { ProxyApiResponseObject } from "@/types/proxy-api"

export const findObjectsByVarKey = (
  varKey: string,
  responses: ProxyApiResponseObject[],
) =>
  responses.find((response) =>
    response.objects.some(({ key }) => key === varKey),
  )?.objects
