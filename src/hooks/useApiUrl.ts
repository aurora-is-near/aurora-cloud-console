import { contract } from "@/app/api/contract"
import { ApiOperation, ApiRequestParams } from "@/types/api"
import { useEffect, useState } from "react"

const getPath = <T extends ApiOperation>(key: T): string | null => {
  const operation = contract[key]

  return "path" in operation && typeof operation.path === "string"
    ? operation.path
    : null
}

const replacePathParams = <T extends ApiOperation>(
  path: string,
  params: ApiRequestParams<T>,
): string => {
  return path.replace(/(:\w+)/g, (match) => {
    const key = match.slice(1)

    if (params && typeof params === "object" && key in params) {
      return String(params[key as keyof typeof params])
    }

    return match
  })
}

export const useApiUrl = <T extends ApiOperation>(
  operation: T,
  params: ApiRequestParams<T>,
) => {
  const [url, setUrl] = useState("")

  useEffect(() => {
    const path = getPath(operation)

    if (!path) {
      throw new Error(`No path found for operation: ${operation}`)
    }

    setUrl(
      new URL(replacePathParams(path, params), window.location.origin).href,
    )
  }, [operation, params])

  return url
}
