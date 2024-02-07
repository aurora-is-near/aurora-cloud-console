import {
  ProxyApiUpateOperation,
  ProxyApiViewOperation,
} from "@/types/proxy-api"

const PROXY_API_BASE_URL = "http://65.108.120.211:8302"

const request = async (
  endpoint: string,
  operations: ProxyApiUpateOperation[] | ProxyApiViewOperation[],
) => {
  const { href } = new URL(endpoint, PROXY_API_BASE_URL)

  const res = await fetch(href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PROXY_API_TOKEN}`,
    },
    body: JSON.stringify(operations),
  })

  if (!res.ok) {
    throw new Error(`Proxy API call failed: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()

  return data
}

export const proxyApiClient = {
  view: (operations: ProxyApiViewOperation[]) =>
    request("/v1/view", operations),
  update: (operations: ProxyApiUpateOperation[]) =>
    request("/v1/update", operations),
}
