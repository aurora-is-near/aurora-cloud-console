import { ProxyApiResponseObject } from "@/types/proxy-api"

export const getLastWrite = (
  responses: ProxyApiResponseObject[] = [],
): string | null => {
  let lastWrite: string | null = null

  responses.forEach((response) => {
    response.objects.forEach((object) => {
      const objLastWrite =
        object.Data.StringVar?.time_meta.last_write ??
        object.Data.NumberVar?.time_meta.last_write ??
        object.Data.SetVar?.time_meta.last_write

      if (!objLastWrite) {
        return
      }

      if (!lastWrite || new Date(objLastWrite) > new Date(lastWrite)) {
        lastWrite = objLastWrite
      }
    })
  })

  return lastWrite
}
