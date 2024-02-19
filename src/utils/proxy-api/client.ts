import { createDebugger } from "@/debug"
import {
  ProxyApiResponse,
  ProxyApiUpateOperation,
  ProxyApiViewOperation,
} from "@/types/proxy-api"

const PROXY_API_BASE_URL = "http://65.108.120.211:8302"

const request = async (
  endpoint: string,
  operations: ProxyApiUpateOperation[] | ProxyApiViewOperation[],
): Promise<ProxyApiResponse> => {
  const debug = createDebugger("proxy-api")
  const { href } = new URL(endpoint, PROXY_API_BASE_URL)

  if (!process.env.PROXY_API_TOKEN) {
    throw new Error("PROXY_API_TOKEN is not set")
  }

  debug("Proxy API request", href, operations)

  const res = await fetch(href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PROXY_API_TOKEN}`,
    },
    body: JSON.stringify(operations),
  })

  const data = (await res.json()) as ProxyApiResponse

  if (!res.ok) {
    throw new Error(`Proxy API call failed [${res.status}]: ${data.error}`)
  }

  debug("Proxy API response", href, JSON.stringify(data, null, 2))

  return data
}

export const proxyApiClient = {
  view: async (operations: ProxyApiViewOperation[]) =>
    request("/v1/view", operations),
  update: async (operations: ProxyApiUpateOperation[]) =>
    request("/v1/update", operations),
}
